const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');    // reusing our requireLogin middleware to check if user is logged in before creating survey
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// these are all different route handlers
module.exports = app => {
    // returning surveys created by specific user
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });


    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    // Lecture 187 - Parsing the Route explains this code
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        // Watch lecture 191 - Lodash Chain Helper to see how he refactored all of this
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);     // if it cant extract surveyId or choice, then it returns null
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact()   // will return only event objects, so no elements will be undefined
            .uniqBy('email', 'surveyId')  // removes duplicates - uniqueness check
            .each(({ surveyId, email, choice }) => {            // running mongo query for each element in events array. Lecture 195 - Executing Queries
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();      // executes query
            })                       
            .value();

        //console.log(events);

        res.send({});       // just responding to SendGrid so that it knows we're receiving it's messages
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // the fields below are actually title: title, and subject: subject etc. but we can use ES6 syntax to condense since they are the same values.
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;      // subtracting credit after email is sent
            const user = await req.user.save();

            res.send(user);     // sending back updated user model
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
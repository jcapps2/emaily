const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);     // dynamically pulling in key from above import file
const requireLogin = require('../middlewares/requireLogin');


// Watching for POST requests made to the /api/stripe route.
// requireLogin does not need to be invoked here. It is called as needed.
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });     // req.body.id is pulling the id from the Stripe token that is returned upon request to buy credits

        //console.log(charge);      shows very large charge object - so we're successfully charging w/ Stripe

        req.user.credits += 5;
        const user = await req.user.save();         // gotta save user model to db

        res.send(user);     // gotta send updated user model back to whoever made the request
    });    
};
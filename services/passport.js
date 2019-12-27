const passport = require('passport');       // importing passportJS
const GoogleStrategy = require('passport-google-oauth20').Strategy;     // look up what this does
const mongoose = require('mongoose');
const keys = require('../config/keys');     // .. means go up one directory (server) and look there

const User = mongoose.model('users');

// user was pulled out of db - done is a callback, where null is an argument for the error handler
passport.serializeUser((user, done) => {
    // user.id is a shortcut to oid(the unique id generated by mongo and assigned to the record).
    // Can't assume that user always has a google id(what if they're signing in with facebook or something?),
    // but we can assume that they will always have this mongo-generated id
    done(null, user.id);
});

// get whatever we put into the cookie as the first param (id)
// Turns id into user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
            //console.log('access token', accessToken);
            //console.log('refresh token', refreshToken);
            //console.log('profile', profile);

            // returns a promise - looking for user to see if they exist in the db - if they do, call done()
            // if they don't, create new record, save it, call done()
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if(existingUser) {
                        // already have a record with the given id
                        // null means everything went fine, no errors - then pass existingUser
                        done(null, existingUser);
                    } else {
                        // we don't have a user - create a new one
                        new User({ googleId: profile.id }).save()
                            .then(user => done(null, user));
                    }
                })
        }
    )
);
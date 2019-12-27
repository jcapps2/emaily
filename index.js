// https://salty-sea-12811.herokuapp.com/

const express = require('express');         // importing Express using commonJS modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');                   // when app boots up, User.js will load, and mongo will as well
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();                      // generates a new express application object

// maxAge is 30 days in milliseconds
// the array around keys essentially allows for us to pass in multiple "keys" so that one can be chosen at random to encrypt the cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);        // neat little trick - require is calling authRoutes, which returns function

const PORT = process.env.PORT || 5000;           // if Heroku has specified a port dynamically, assign it to port. If not, and we're developing, assign to 5000
app.listen(PORT);        
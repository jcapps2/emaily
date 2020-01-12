// Course name - Node with React: Fullstack Web Development

// https://salty-sea-12811.herokuapp.com/
// npx create-react-app client - make sure you name it 'client'

const express = require('express');         // importing Express using commonJS modules
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');                   // when app boots up, User.js will load, and mongo will as well
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();                      // generates a new express application object

app.use(bodyParser.json());                 // Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

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
require('./routes/billingRoutes')(app);     // so both of these lines turn into functions and execute immediately, and pass in 'app'
require('./routes/surveyRoutes')(app);

// Only runs in production - if this is confusing, watch Lecture 116 Routing in Production
if (process.env.NODE_ENV === 'production') {    
    // Express will serve up production assets, like our main.js file, 
    // or main.css file.
    app.use(express.static('client/build'));    // basically searches for the main.js file in client/build
                                                // because that is what everything is condensed to when 
                                                // npm run build is used in the client directory.

    // Express will serve up the index.html file if it doesn't recognize
    // the route.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;           // if Heroku has specified a port dynamically, assign it to port. If not, and we're developing, assign to 5000
app.listen(PORT);        
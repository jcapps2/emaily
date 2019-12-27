// keys.js - figure out what set of credentials to us

// I think the env variables are looking at heroku to see if we're in prod.
// I was right, and Heroku automatically sets the following NODE_ENV variable
if (process.env.NODE_ENV === 'production') {
    // we are in prod - return prod keys
    module.exports = require('./prod');
} else {
    // we are in dev - return dev keys
    module.exports = require('./dev');
}
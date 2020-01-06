const passport = require('passport');

module.exports = app => {
    // the 'google' string used below is internally linked to the above GoogleStrategy - does it all on its own
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']     // permissions being asked for from the users google account - not made up
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),    // middleware that passes to following arrow function
        (req, res) => {
            res.redirect('/surveys');       // redirect passes user to /surveys
        }
    );

    // logout() is automatically connected to req via passport - kills cookie
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');      // '/' sends user back to root
    });
    
    // req is incoming request, res is outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
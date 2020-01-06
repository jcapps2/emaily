// Makes sure the user is logged in before proceeding through a certain route
module.exports = (req, res, next) => {
    if (!req.user) {        // stop process if no user logged in
        return res.status(401).send({ error: 'You must log in' });
    }

    next();     // if the user is logged in, go to next (if it exists) middleware
};
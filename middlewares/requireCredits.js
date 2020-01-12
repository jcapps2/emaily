// The status code (403) used here and (401) used in requireLogin.js are HTTP status codes

module.exports = (req, res, next) => {
    if (req.user.credits < 1) {        // stop process if less than 1 credit
        return res.status(403).send({ error: 'Not enough credits!' });
    }

    next();     // if the user has credits, go to the next middleware (if it exists)
};
// React looks for this file automatically and loads it,
// so there is no need to require it anywhere.

const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    //app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
}
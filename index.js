const express = require('express')      // importing Express using commonJS modules
const app = express()                   // generates a new express application object

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000           // if Heroku has specified a port dynamically, assign it to port. If not, and we're developing, assign to 5000
app.listen(PORT)        // localhost:5000
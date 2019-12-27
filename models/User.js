const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;    // equivalent to above line - called destructuring in JS

// can freely add or subtract properties at no penalty - mongo is cool like that
const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);       // creating a new collection in mongo for users - loads a schema into mongo
const mongoose = require('mongoose');

const Schema =  mongoose.Schema

// this is a schema which will be followed whenever we will create a user
const userSchema = new Schema({
    username: {
        type: String,
        // required: true,
        required: [true, 'You must enter the userName'], //custom error message
        minlength: 4
        // minlength: [7, 'min user name length is seven']
    },
    email: {
        type: String,
        required: true,
        minlength: 4
    },   
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    age: {
        type: Number,
        // default: 27,
        min: 27,
        max: 100,
        required: true
    }
})

// User is a model which is having reference to the collection and the schema of that collection
// UserData wil be the name of the collection which will be created in the DB.

const User = mongoose.model('User', userSchema);

// exported the modal to use it outside 
module.exports = User;



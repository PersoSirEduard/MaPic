const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/*
    ==============
     DESCRIPTION
    ==============
    This script holds the schema database model with user information.
    
*/

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function (password) { // Encrypt password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) { // Verify password 
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

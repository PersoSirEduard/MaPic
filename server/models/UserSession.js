const mongoose = require('mongoose');

/*
    ==============
     DESCRIPTION
    ==============
    This script holds the user session information.
    
*/

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    user_name: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);

const mongoose = require('mongoose');
const random = require('random-string-generator');
const jwt = require('jsonwebtoken');

/*
    ==============
     DESCRIPTION
    ==============
    This script holds the user session information.
    
*/

const PRIVATE_KEY_UPDATE_INTERVAL = 3600000 // Interval time for updating the private keys
const PRIVATE_KEYS_MAX_SIZE = 5 // Max # of private keys at a time

var privateKeys = []
for (var i = 0; i < PRIVATE_KEYS_MAX_SIZE; i++) { privateKeys.push(random(10)) } // Create initial private keys

setInterval(() => { // Private keys array update loop

    privateKeys.shift(); // Remove oldest key
    privateKeys.push(random(10)); // Add new key
    
}, PRIVATE_KEY_UPDATE_INTERVAL);



const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    userName: {
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

// Generate token for session
UserSessionSchema.methods.generateToken = function (userId, userName) {
    if (privateKeys.length == 0) throw new Error("No private key was found!");

    var token = jwt.sign({
        data: {
            userId: userId,
            userName: userName
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, privateKeys[privateKeys.length - 1]); // Lastest private key

    return token
};

// Verify token for session
UserSessionSchema.methods.verifyToken = function (token, privateKeys) {
    if (privateKeys.length == 0) throw new Error("No private key was found!");

    privateKeys.forEach(key => {
        try {
            var decoded = jwt.verify(token, key);
            return decoded; // Valid key
        } catch(err) {
            // Just ignore error and go to next key
        }
    });

    return false; // Invalid token with all keys
}

module.exports = mongoose.model('UserSession', UserSessionSchema);

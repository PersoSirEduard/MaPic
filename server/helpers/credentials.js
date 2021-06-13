const User = require("../models/User");
const UserSession = require("../models/UserSession");
const random = require('random-string-generator');
const jwt = require('jsonwebtoken');

/*
    ============
    Description
    ============

    This file provides 3 functions:
        - createNewSession: creates a new session in the database and returns a token
        - removeSession: removes a session from the database
        - verifySession: express middleware to verify if the session is valid and returns the session if valid

*/

const PRIVATE_KEY_UPDATE_INTERVAL = 3600000 // Interval time for updating the private keys
const PRIVATE_KEYS_MAX_SIZE = 5 // Max # of private keys at a time

var privateKeys = []
for (var i = 0; i < PRIVATE_KEYS_MAX_SIZE; i++) { privateKeys.push(random(10)) } // Create initial private keys

setInterval(() => { // Private keys array update loop

    privateKeys.shift(); // Remove oldest key
    privateKeys.push(random(10)); // Add new key
    
}, PRIVATE_KEY_UPDATE_INTERVAL);


function getPrivateKeys() {
    return privateKeys;
}

// Generate token for session
function generateToken(userId, userName) {
    const keys = getPrivateKeys()
    if (keys.length == 0) throw new Error("No private key was found!");

    console.log(keys[keys.length - 1])

    var token = jwt.sign({
        data: {
            userId: userId,
            userName: userName
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, keys[keys.length - 1]); // Lastest private key

    return token
};

// Verify token for session
function verifyToken(token) {
    const keys = getPrivateKeys()
    if (keys.length == 0) throw new Error("No private key was found!");

    for (key of keys) {
        var decoded = null;

        try {
            decoded = jwt.verify(token, key);
        } catch(err) {
            // Just ignore error and go to next key
        }

        if (decoded != null) return decoded // Valid key
    }

    return false; // Invalid token with all keys
}



function createNewSession(userId, userName) { // Create new session for user
    return new Promise((resolve, reject) => {
  
  
      // Verify if session already exists
      UserSession.findOne( // Verify if the token is in user sessions database already
        {
          userName: userName,
          isDeleted: false
        },
        (err, session) => {
          if (!err && session != null) {
            resolve(session.token);
          }
        });
  
      const userSession = new UserSession();
  
      userSession.userId = userId;
      userSession.userName = userName;
  
      // Generate new session token
      userSession.token = generateToken(userId, userName);
  
      userSession.save((err, doc) => {
  
        if (err) {
  
          reject(false);
  
        } else {
  
          resolve(userSession.token);
  
        }
      });
    });
}

function removeSession(token) {

    return new Promise((resolve, reject) => {

        // Verify the token is one of a kind and its not deleted

        UserSession.findOneAndDelete(
            {
              token: token,
              isDeleted: false
            },
            (err, session) => {
              if (err) {
                // No session could be removed
                reject(false);
      
              }
              // Session removed
              resolve(session);
        });

    });

}

// Middleware verification
function verifySession(req, res, next) {
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and its not deleted

    if (verifyToken(token)) {

        console.log("token was found valid")

      UserSession.findOne( // Verify if the token is in user sessions database
        {
          token: token,
          isDeleted: false
        },
        (err, session) => {

          if (err) {

            return res.send({
              success: false,
              message: "Error: Server error."
            });

          }

          if (session == null) {

            // No session was found

            return res.send({
                success: false,
                message: "Error: Invalid or expired session."
            });

          } else {

            // Valid session was found
            // Further code can be executed
            req.session = session; // Pass on the session for the next function
            next();

          }
        });

    } else {

      // Token is invalid or expired

      UserSession.deleteOne({ token: token }); // Delete session if it exists

      return res.send({
        success: false,
        message: "Error: Invalid or expired session."
      });

    }
}

module.exports = { createNewSession, removeSession, verifySession, getPrivateKeys }
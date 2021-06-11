const User = require("../../models/User");
const UserSession = require("../../models/UserSession");
const jwt = require('jsonwebtoken');

/*
    ==============
     DESCRIPTION
    ==============
    This script handles the creation of user and also manages the creation, verification, and deletion of user sessions.
    API Root dir: './api/account/'

    -> POST './api/account/signup/': {
        userName: (String),
        password: (String),
        email: (String)
      }

    -> POST './api/account/signin/': {
        email: (String),
        password: (String)
      }

    -> POST './api/account/verify/': {
        token: (String)
      }

    -> POST './api/account/logout/': {
        token: (String)
      }
    
*/

function createNewSession(userId, userName) { // Create new session for user
  return new Promise((resolve, reject) => {


    // Verify if session already exists
    UserSession.findOne( // Verify if the token is in user sessions database already
      {
        userName: userName,
        isDeleted: false
      },
      (err, session) => {
        if (!err) {
          resolve(session.token);
        }
      });

    const userSession = new UserSession();

    userSession.userId = userId;
    userSession.userName = userName;

    // Generate new session token
    userSession.token = userSession.generateToken(userId, userName);

    userSession.save((err, doc) => {

      if (err) {

        reject(false);

      } else {

        resolve(userSession.token);

      }
    });
  });
}

module.exports = app => {
  /*
    ========
    Sign Up
    ========
  */

  app.post("/api/account/signup", (req, res, next) => { // Create new account
    const { body } = req;
    var { userName, password, email } = body;

    if (!userName) { // Check if username exists
      return res.send({
        success: false,
        message: "Error: Username cannot be blank"
      });
    }
    if (!email) { // Check if email exists
      return res.send({
        success: false,
        message: "Error: Email cannot be blank"
      });
    }
    if (!password) { // Check if password exists
      return res.send({
        success: false,
        message: "Error: Password cannot be blank"
      });
    }

    email = email.toLowerCase();

    // Steps:
    // Verify if email doesn't exist in database
    User.find({ email: email }, (err, previousUsers) => {

      if (err) {

        return res.send({ success: false, message: "Error: Server error" });

      } else if (previousUsers.length > 0) {
        // Email already used
        return res.send({
          success: false,
          message: "Error: Email already in use."
        });

      }

      // Verify username isn't already taken
      User.find({ userName: userName }, (err, previousUsers) => {
        if (err) {

          return res.send({
            success: false,
            message: "Error: Server error"
          });

        } else if (previousUsers.length > 0) {
          // Username already used
          return res.send({
            success: false,
            message: "Error: Username already in use."
          });

        }

        // Save the new user
        const newUser = new User();

        newUser.email = email;
        newUser.userName = userName;
        newUser.password = newUser.generateHash(password); // Encrypt password

        newUser.save((err, user) => {

          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }

          // Create a new user session
          createNewSession(user._id, userName).then((token) => {
            if (token) {

              return res.send({
                success: true,
                token: token,
                message: "Successfully signed up."
              });

            } else {

              return res.send({
                success: false,
                token: "",
                message: "Server Error: Could not create a user session.",
              });

            }
          });

        });
      });
    });
  });

  /*
    ========
    Sign in
    ========
  */

  app.post("/api/account/signin", (req, res, next) => { // Login to account
    const { body } = req;
    var { password, email } = body;

    if (!email) { // Check if email exists
      return res.send({
        success: false,
        message: "Error: Email cannot be blank"
      });
    }
    if (!password) { // Check if password exists
      return res.send({
        success: false,
        message: "Error: Password cannot be blank"
      });
    }

    email = email.toLowerCase();

    User.find({ email: email }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error"
        });
      }

      if (users.length < 1) { // No user was found
        return res.send({
          success: false,
          message: "Error: invalid username or password"
        });
      }

      const user = users[0]; // Get current user

      if (!user.validPassword(password)) { // Verify password
        return res.send({
          success: false,
          message: "Error: invalid username or password"
        });
      }

      // Otherwise valid user

      // Create new user session
      createNewSession(user._id, user.userName).then((token) => {

        if (token) {

          return res.send({
            success: true,
            message: "Valid sign in",
            token: token
          });

        } else {

          return res.send({
            success: false,
            token: "",
            message: "Server Error: Could not create a user session."
          });

        }

      });

    });
  });

  /*
    ===================
    Verify user session
    ===================
  */

  app.get("/api/account/verify", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and its not deleted

    if (UserSession.verifyToken(token)) {

      UserSession.findOne( // Verify if the token is in user sessions database
        {
          token: token,
          isDeleted: false
        },
        (err, sessions) => {

          if (err) {

            return res.send({
              success: false,
              message: "Error: Server error."
            });

          }

          if (sessions == null) {

            return res.send({
              success: false,
              message: "Error: Invalid session."
            });

          } else {

            return res.send({
              success: true,
              message: "Verified",
              userName: sessions.userName
            });

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

  });

  /*
    ========
    Log out
    ========
  */

  app.get("/api/account/logout", (req, res, next) => { // Remove user session
    const { query } = req;
    const { token } = query;

    //verify the token is one of a kind and its not deleted

    UserSession.findOneAndDelete(
      {
        token: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          // No session could be removed
          return res.send({
            success: false,
            message: "Error: Server error"
          });

        }
        // Session removed
        return res.send({
          success: true,
          message: "Logged out succesfully"
        });
      });
  });

};

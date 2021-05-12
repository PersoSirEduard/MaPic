const User = require("../../models/User");
const UserSession = require("../../models/UserSession");


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

module.exports = app => {
  /*
    ========
    Sign Up
    ========
  */

  app.post("/api/account/signup", (req, res, next) => { // Create new account
    const { body } = req;
    const { userName, password, email } = body;

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
          return res.send({
            success: false,
            message: "Error: Username already in use."
          });
        }

        // Save the new user
        const newUser = new User();

        newUser.email = email;
        newUser.userName = userName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }
          // Create a new user session
          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession.user_name = userName;
          userSession.save((err, doc) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error: server error"
              });
            }

            return res.send({
              success: true,
              message: "Signed up succesfully",
              token: doc._id
            });
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
    const { password, email } = body;

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

      const user = users[0];
      if (!user.validPassword(password)) { // Verify password
        return res.send({
          success: false,
          message: "Error: invalid username or password"
        });
      }

      // Otherwise valid user

      const userSession = new UserSession(); // Create new user session
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id
        });
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
    // ?token = test

    // Verify the token is one of a kind and its not deleted

    UserSession.findOne(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions == null) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Verified",
            user_name: sessions.user_name
          });
        }
      });
  });

  /*
    ========
    Log out
    ========
  */

  app.get("/api/account/logout", (req, res, next) => { // Remove user session
    const { query } = req;
    const { token } = query;
    // ?token = test

    //verify the token is one of a kind and its not deleted

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      { $set: { isDeleted: true } },
      null,
      (err, sessions) => {
        if (err) {
          // console.log("Auth deleting error" + err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        // console.log("Auth deleting successful");
        return res.send({
          success: true,
          message: "Logged out succesfully"
        });
      });
  });
};

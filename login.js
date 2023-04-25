const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const session = require('express-session');


router.get("/login", (req, res) => {
  res.render("login", { page_title: "Login" });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    connection.query(
      "SELECT * FROM accounts WHERE email = ?",
      [email],
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          const user = results[0];
          // Compare the password entered by the user with the hashed password in the database using bcrypt
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              // If the password matches, set the session variable and redirect to the home page
              req.session.is_loggedin = true;
              res.redirect("/index");
            } else {
              // If the password does not match, render the login page with an error message
              res.render("login", {
                title: "Candy Shop Login Page",
                page_title: "Login",
                bad_input: "Incorrect email or password!",
              });
            }
          });
        } else {
          // If the email does not exist, render the login page with an error message
          res.render("login", {
            title: "Candy Shop Login Page",
            page_title: "Login",
            bad_input: "Incorrect email or password!",
          });
        }
      }
    );
  } else {
    // If the email or password is missing, render the login page with an error message
    res.render("login", {
      title: "Candy Shop Login Page",
      page_title: "Login",
      bad_input: "Please enter email and password!",
    });
  }
});

module.exports = router;

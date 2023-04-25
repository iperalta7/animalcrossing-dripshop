const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const User = require("../models/User");

// Show the login page
router.get("/shop", (req, res) => {
    res.render("shop");
});

// Handle logout
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Server error");
        }
        res.clearCookie("connect.sid");
        res.redirect("/auth/login");
    });
});

module.exports = router;
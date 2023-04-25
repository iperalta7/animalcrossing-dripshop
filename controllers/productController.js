const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const User = require("../models/User");

// Show the login page
router.get("/shop", (req, res) => {
    res.render("shop", 
    {title: "Drip Shop Page",
    page_title:"Animal Drip Shop!",
    isLoggedIn: req.session.isLoggedIn}
    );
});

// Handle logout


module.exports = router;
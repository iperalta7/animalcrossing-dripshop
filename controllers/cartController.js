const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const User = require("../models/User");

// Show the login page
router.get("/cart", (req, res) => {
    res.render("cart");
});


module.exports = router;
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const User = require("../models/User");


// Show the cart page
router.get("/cart", (req, res) => {
    res.render("shop", 
    {title: "Drip Shop",
    page_title:"Animal Drip Shop!",
    isLoggedIn: req.session.isLoggedIn}
    );
});


module.exports = router;
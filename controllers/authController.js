const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const User = require("../models/User.js");

// Show the login page
router.get("/login", (req, res) => {
    res.render("login",{
        "title": "Login page",
        "page_title":"Please login"
    });
});

// Handle login
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    User.findOne(username, (error, user) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Server error");
        }

        if (!user) {
            return res.render("login", { title: "Login page",
            page_title:"Please login", error: "Username not found" });
        }

        if (password === user.password) {
            req.session.isLoggedIn = true;
            req.session.username = user.username;
            res.redirect("/shop");
        } else {
            res.render("login", { 
                title: "Login page",
                page_title:"Please login", 
                error: "Incorrect password" 
            
        });
    }
});
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

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const User = require("../models/User");

// Show the login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            req.session.error_msg = "Email not found";
            return res.redirect("/auth/login");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            req.session.user = {
                id: user.id,
                email: user.email,
            };
            req.session.success_msg = "Logged in successfully";
            res.redirect("/shop");
        } else {
            req.session.error_msg = "Incorrect password";
            res.redirect("/auth/login");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
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
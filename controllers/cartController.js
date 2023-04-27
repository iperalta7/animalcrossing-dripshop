const express = require("express");
const router = express.Router();

// Show the cart page
router.get("/cart", (req, res) => {
    let user = req.session.username;
    res.render("cart", 
    {title: `${user}'s Cart`,
    page_title:`${user}'s Cart`,
    isLoggedIn: req.session.isLoggedIn}
    );
});


module.exports = router;
const express = require("express");
const router = express.Router();


// Show the orders page
router.get("/orders", (req, res) => {
    let user = req.session.username;
    res.render("orders", 
    {title: "Orders Page",
    page_title:`${user}'s Orders`,
    isLoggedIn: req.session.isLoggedIn}
    );
});

module.exports = router;
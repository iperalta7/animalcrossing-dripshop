const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart.js");


// Show the cart page
router.get("/cart", (req, res) => {
    Cart.showCart(req.session.username, (error, cart) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Server error");
        }
        res.render("cart", {
          title: "Drip Shop Page",
          page_title: "Animal Drip Shop!",
          isLoggedIn: req.session.isLoggedIn,
          cart,
        });
      });
});

router.post("/cart", (req, res) => {
    const custID = req.session.username;
    const fitID = req.body.fitID;
    // add the fitID to the cart table in the database
    Cart.addFitToCart(custID, fitID, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
      res.redirect("/shop");
    });
  });

module.exports = router;
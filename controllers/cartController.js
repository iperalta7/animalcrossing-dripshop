const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart.js");


router.get("/cart", (req, res) => {
  Cart.showCart(req.session.username, (error, cart) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
    Cart.getCartTotal(req.session.username, (error, cartTotal) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
      res.render("cart", {
        title: `${req.session.username}'s Cart`,
        page_title: `${req.session.username}'s Cart`,
        isLoggedIn: req.session.isLoggedIn,
        cart,
        cartTotal,
      });
    });
  });
});
router.post("/cart", (req, res) => {
    const custID = req.session.username;
    const fitID = req.body.fitID;
    const price = req.body.total_price;
    // add the fitID to the cart table in the database
    Cart.addFitToCart(custID, fitID, price, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
      res.redirect("/shop");
    });
  });

  router.post("/cart/delete", (req, res) => {
    const custID = req.session.username;
    const fitID = req.body.fitID;
    // add the fitID to the cart table in the database
    Cart.deleteFromCart(custID, fitID, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
      res.redirect("/cart");
    });
  });

module.exports = router;
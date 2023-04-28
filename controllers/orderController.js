const express = require("express");
const router = express.Router();

const Order = require("../models/Order.js");


// Add a new route for fetching and displaying orders
router.get('/orders', (req, res) => {
    const custID = req.session.username;
  
    Order.getOrdersByCustomer(custID, (error, orders) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching orders.');
      } else {
        res.render('orders', {
            title: `${req.session.username}'s Orders`,
          page_title: `${req.session.username}'s Orders`,
          isLoggedIn: req.session.isLoggedIn, 
            orders: orders });
      }
    });
  });

// Add a new route for order creation
router.post('/order/create', (req, res) => {
  if(req.body.cartTotal != ""){
    const custID = req.session.username;
    const total = req.body.cartTotal;
    const fitIDs = req.body.fitIDs;
    console.log(req.body.fitIDs);
  
    Order.createOrder(custID, fitIDs, total, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error creating order.');
      } else {
        const Cart = require("../models/Cart.js");

        Cart.deleteCartByCustomer(custID, (error, result) => {
          if (error) {
            console.error(error);
          }
        });
        res.redirect('/orders'); // Redirect to a success page, or any other page you'd like.
      }
    });
  }else{
    res.redirect('/cart');
  }
    
  });

module.exports = router;
const app = require('./server.js')
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const session = require('express-session');
const connection = require('./database');

const loginRoute = require('./login.js');

// Define a middleware function to check if a user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.is_loggedin) {
    // If the user is logged in, continue to the next middleware function
    next();
  } else {
    // If the user is not logged in, redirect them to the login page
    res.redirect('/login');
  }
};

// Define a middleware function to set a default page title
const setPageTitle = (req, res, next) => {
  res.locals.title = 'Candy Shop';
  next();
};

// Use session middleware to manage sessions
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Use middleware to set a default page title for all routes
router.use(setPageTitle);

router.get('/', (req, res) => {
  res.render('index', { page_title: 'Welcome to the Animal Crossing Shop' });
});

router.get('/shop', (req, res) => {
  connection.query('SELECT * FROM customers', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.use('/',loginRoute);

router.get('/cart', isLoggedIn, (req, res) => {
  res.send('Cart');
});

module.exports = router;
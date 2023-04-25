// Required modules for web server
const express = require('express');
const session = require("express-session");

var app = express(); // init application as an express app

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }))
const PORT = 8080;  //set port number

// create path to the dir w files
const dir = __dirname + '/public/';

//set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        content: function() {
            // Define your content helper function here
            return "This is some dynamic content";
        }
    }
});

//html engine configuration
app.engine('handlebars', handlebars.engine);
app.set('views', dir+'views');
app.set('view engine', 'handlebars');

// tell express what directores it needs to look into
app.use(express.static(dir));
app.use(express.static(dir + '/css'));


// Set up session middleware
app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false
}));

// Import routes
const authRoutes = require("./controllers/authController");
const productRoutes = require("./controllers/productController");
const cartRoutes = require("./controllers/cartController");
const orderRoutes = require("./controllers/orderController");

// Home page route
app.get("/", (req, res) => {
    res.render("index",{
        "title": "Home page",
        "page_title":"Welcome to Animal Drip Shop!"
    });
});

// Home page route
app.get("/index", (req, res) => {
    res.render("index",{
        "title": "Home page",
        "page_title":"Welcome to Animal Drip Shop!",
        isLoggedIn: req.session.isLoggedIn
    });
});

// Use routes
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);

var server = app.listen(8081, function (){
  var host = server;
  var port = server.address().PORT;
  console.log("Example app listening at http://localhost:" + port);
})

module.exports = app;

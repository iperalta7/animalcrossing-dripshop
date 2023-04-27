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
app.use(express.static(dir + '/assets'));


// Set up session middleware
app.use(
    session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, // 1 hour
}));

// Import routes
const authRoutes = require("./controllers/authController");
const productRoutes = require("./controllers/shopController");
const cartRoutes = require("./controllers/cartController");
const orderRoutes = require("./controllers/orderController");

// Home page route
app.get("/", (req, res) => {
    res.render("index",{
        "title": "Home page",
        "page_title":"Welcome to Animal Drip Shop!",
        isLoggedIn: req.session.isLoggedIn
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

var server = app.listen(PORT, function (){
  //var host = server;
  //var port = server.address().port;
  console.log("Example app listening at http://localhost:" + PORT);
})

module.exports = app;

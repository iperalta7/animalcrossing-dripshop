const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Import the User model
const Shop = require("../models/Shop.js");

// Show the shop page
router.get("/shop", (req, res) => {
    fetchAll(req,res);
  });


// Get outfits by designer
router.post("/shop", (req, res) => {
    const designerEmail = req.body.designerEmail;
    if (designerEmail === "*"){
        fetchAll(req,res);

    }else{
        Shop.fetchOutfitsByDesigner(designerEmail, (error, outfits) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Server error");
            }
            res.render("shop", {
              title: "Drip Shop Page",
              page_title: "Animal Drip Shop!",
              isLoggedIn: req.session.isLoggedIn,
              outfits,
            });
          });
        }
    }
    );


function fetchAll(req, res){
    return Shop.fetchAllOutfits((error, outfits) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Server error");
        }
    
        res.render("shop", {
          title: "Drip Shop Page",
          page_title: "Animal Drip Shop!",
          isLoggedIn: req.session.isLoggedIn,
          outfits,
        });
      });
}

module.exports = router;
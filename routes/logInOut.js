// Define express and router object
   var express  = require("express"),
       router   = express.Router(),
       passport = require("passport");   

// Define Databases
   var User     = require("../models/user");
   
// ========================
// Login and Logout Routes
// ========================

// Show Login form
   router.get("/login", function(req, res){
      res.render("users/login");
   });
   
// Login with users
   router.post("/login", passport.authenticate("local", {successRedirect: "/yelpcamp/campgrounds", failureRedirect: "/yelpcamp/login"}),function(req, res){});
   
// Logout the user
   router.get("/logout", function(req, res){
      req.logout();
      req.flash("success", "You have been successfully logged out.");
      res.redirect("campgrounds");
   });

   module.exports = router;
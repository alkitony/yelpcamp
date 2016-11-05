// Define express and router object
   var express = require("express");
   var router  = express.Router(); 

// Define Databases
   var Campground = require("../models/campground");

// Set Campground object for campground routes
   router.use(function(req, res, next){
       req.root = Campground;
       next();
   });
   
// Add middleware 
   var midWare    = require("../middleware"); 


// Show all the Campgrounds
   router.get("/", function (req, res) {
      Campground.find({}, function(err, campgroundList){
         if (err) {
            req.flash("error", "Could not find Campground. Sys Msg: " + err.message);
            res.redirect("/yelpcamp")
         } else {
         res.render("campgrounds/index", {campgroundList : campgroundList}); 
         }
      });
   });

// Show the form to get new campground
   router.get("/new", midWare.isLoggedIn, function (req, res) {
      res.render("campgrounds/new"); 
   });

// Save new campground to the database
   router.post("/", midWare.isLoggedIn, function(req, res) {
      
      // Get Data from form 
      var newCampground = req.body.campground;
      newCampground.author = req.user;
      newCampground.addDate = new Date();
      newCampground.updateDate = new Date();

      // Add new campground to database
      Campground.create(newCampground, function(err, insertedCampground) {
         if(err){
            req.flash("error", "Unable to create Campground, Sys Msg: " + err.message)
         } else {
            req.flash("success","Created Campground");
         }
         res.redirect("campgrounds");
      });
   });

// Show the campground details page
   router.get("/:id", function(req, res) {
      Campground.findById(req.params.id).populate({path: "comments", options: {sort: {updateDate: -1}}}).exec(function(err, foundCampground){
         if(err){
            req.flash("error", "Unable to find Campground, Sys Msg: " + err.message)
            res.redirect("/yelpcamp/campgrounds");
         } else {
         res.render("campgrounds/show", { campground : foundCampground });
         }
      });
   });
   
// Edit Campground route
   router.get("/:id/edit", midWare.checkOwner, function(req, res) {
      Campground.findById(req.params.id, function(err, foundCampground){
         if(err){
            req.flash("error", "Unable to find Campground, Sys Msg: " + err.message)
            res.redirect("yelpcamp/campgrounds");
         } else {
            res.render("campgrounds/edit", { campground : foundCampground });
         }
      });
   });

// Update the campground in the database
   router.put("/:id", midWare.checkOwner, function(req, res){
      req.body.campGround.updateDate = new Date();
      console.log("Request body campGround", req.body)
      Campground.findByIdAndUpdate(req.params.id, req.body.campGround, function(err, updatedCampground){
         if (err) {
            req.flash("error", "Unable to update Campground, Sys Msg: " + err.message)
            res.redirect("/yelpcamp/campgrounds");
         } else {
            req.flash("success", "Campground has been updated");
            res.redirect("./" + updatedCampground._id);
         }
      });
   });

// DESTROY Route
   router.delete("/:id", midWare.checkOwner, function(req, res){
      Campground.findByIdAndRemove(req.params.id, function(err){
         if (err) {
            req.flash("error", "Unable to delete Campground, Sys Msg: " + err.message);
         } else {
            req.flash("success", "Campground has been deleted");
         }
         res.redirect("/yelpcamp/campgrounds");
      });
   });

module.exports = router;
// Define express and router object
   var express    = require("express");
   var router     = express.Router({mergeParams: true}); 

// Define Databases
   var Campground = require("../models/campground"),
       Comment    = require("../models/comment");

// Add middleware 
   var midWare    = require("../middleware/index"); 

// Set Comment object for comment routes
   var commentObj = {
      comment:    "",
      author:     "",
      addDate:    "",
      updateDate: ""
   }

// New comment round
   router.get("/new", midWare.isLoggedIn, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground){
         if (err) {
            req.flash("error", "Can not find Campground. Sys Msg: " + err.message);
         } else {
            res.render("comments/new", { campground : foundCampground });
         }
      });
   });

// POST: new comment to database and campground
   router.post("/", midWare.isLoggedIn, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground){
         if (err) {
            req.flash("error", "Can not find Campground. Sys Msg: " + err.message);
            res.redirect("/campgrounds");
         } else {
            commentObj.comment    = req.body.comment;
            commentObj.author     = req.user;
            commentObj.addDate    = new Date();
            commentObj.updateDate = new Date();
            Comment.create(commentObj ,function(err,commentSaved){
               if (err) {
                  req.flash("error", "Unable to create Comment. Sys Msg: " + err.message);
               } else {
                  foundCampground.comments.push(commentSaved);
                  foundCampground.save(function(err){
                      if (err) {
                          req.flash("error", "Unable to associate Comment to the Campground. Sys Msg: " + err.message);
                      } else {
                          req.flash("success", "Comment has been saved");
                          res.redirect("/campgrounds/" + foundCampground._id);
                      }
                  });                                       
               } 
            }); 
         }
      });
   });

// Edit a comment
   router.get("/:comment_id/edit", midWare.checkOwner, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground) {
         if (err) {
            req.flash("error", "Can not find Campground. Sys Msg: " + err.message);
         } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
               if (err) {
                  req.flash("error", "Can not find Comment. Sys Msg: " + err.message);
               } else {
                  res.render("comments/edit", {campground : foundCampground, comment : foundComment });
               }
            });
         } 
      })
   });

// Put change to the comment to the database
   router.put("/:comment_id/", midWare.checkOwner, function(req, res){
      commentObj.comment = req.body.comment;
      commentObj.updateDate = new Date();
      Comment.findByIdAndUpdate(req.params.comment_id, commentObj, function(err, updatedComment) {
         if (err) {
            req.flash("error", "Can not update Comment. Sys Msg: " + err.message);
         } else { 
            req.flash("success", "Comment is updated.");
            res.redirect("/campgrounds/" + req.params.id);
         }
      });
   });

// Destroy the comment from the database
   router.delete("/:comment_id/", midWare.checkOwner, function(req, res){
      Comment.findByIdAndRemove(req.params.comment_id, function(err) {
         if (err) {
            req.flash("error", "Can not delete Comment. Sys Msg: " + err.message);
         } else {
            req.flash("success", "Comment has been deleted.");
            res.redirect("/campgrounds/" + req.params.id);
         }
      });
   });

module.exports = router;
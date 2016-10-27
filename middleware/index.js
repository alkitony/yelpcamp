// Define middleware Object
   var middlewareObj = {};

// Define Databases
   var Campground = require("../models/campground"),
       Comment    = require("../models/comment");
       
// Define methods for middleware object
// Define Check Campground Owner
   middlewareObj.checkOwner = function (req, res, next) {
       if (req.isAuthenticated()) {
          var objId = (req.root.modelName === "Campground" ? req.params.id : req.params.comment_id);
          req.root.findById(objId, function(err, foundObject){
             if(err){
                req.flash("error", "Could not find " + req.root.modelName + ". Sys Msg:" + err.message);
                res.redirect("back");
             }
             else {
                if(foundObject.author._id.equals(req.user._id)) {
                   return next();
                } else {
                    req.flash("error", ("You do not have access to edit or delete this " + req.root.modelName));
                    res.redirect("back");
                }
             }
          });
       } else {
           req.flash("error", ("Please login in order to edit or delete the " + req.root.modelName));
           res.redirect("back");
       }
   };

// Verify if the user is logged in
   middlewareObj.isLoggedIn = function (req, res, next)
      {  if(req.isAuthenticated()){
             return next();
         }
         req.flash("error", ("Please login to create a " + req.root.modelName));
         res.redirect("/login");
      };

module.exports = middlewareObj
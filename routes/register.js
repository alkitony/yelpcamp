// Define express and router object
   var express  = require("express"),
       router   = express.Router(),
       passport = require("passport");   

// Define Databases
   var User     = require("../models/user");
   
// Show register form
   router.get("/", function(req, res){
      res.render("users/new");
   });
   
// Create user and login.
   router.post("/", function(req, res){
       // adding user to database
       var newUser = new User({
           username: req.body.username,
           email:    req.body.email
       })
       console.log(newUser);
       User.register(newUser, req.body.password, function(err, user){
          if (err) {
              req.flash("error", "Unable to create account. Sys Msg: " + err.message);
              res.redirect("/register");
          } else {
              req.flash("success", "Account has been created.");
              passport.authenticate("local")(req, res, function(){
                  res.redirect("/yelpcamp/campgrounds")
              });
          }
       });
   });
   
   module.exports = router;
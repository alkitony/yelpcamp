// Define express and router object
   var express        = require("express"),
       router         = express.Router({mergeParams: true}),
       passport       = require("passport"),
       expressSession = require("express-session"),
       nodemailer     = require("nodemailer"),
       ses            = require('nodemailer-ses-transport'),
       async          = require("async"),
       crypto         = require("crypto"),
       envGlobalObj   = require("../envGlobalObj.js");

// Define Databases
   var User           = require("../models/user");
   
// Get the Reset password from user
   router.get('/', function(req, res) {
       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
           if (!user) {
               req.flash('error', 'Password reset token is invalid or has expired.');
               console.log("Password token is invalid");
               return res.redirect('/forgot');
           }
           res.render('users/reset', { user : user, token : req.params.token });
       });
   });
   
// Save new password in database, send changed password confirmation email
   router.post('/', function(req, res) {
       async.waterfall(
           [
            function(done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('/campgrounds');
                    }
                    user.setPassword(req.body.password, function(err, resetUser){
                       if (err) {
                          req.flash("error", "Unable to reset password");
                       } else {
                          resetUser.resetPasswordToken = undefined;
                          resetUser.resetPasswordExpires = undefined;
                          resetUser.save(function(err, savedUser) {
                              done(err, savedUser);
                          });
                       }
                    });
                });
            },
            function(user, done) {
              var smtpTransport = nodemailer.createTransport(ses({
                  accessKeyId:     envGlobalObj.accessKeyId,
                  secretAccessKey: envGlobalObj.secretAccessKey,
                  rateLimit:       envGlobalObj.rateLimit,
                  region:          envGlobalObj.region
                  })
               );
               var mailOptions = {
                   to:      user.email,
                   from:    envGlobalObj.appEmailAddress,
                   subject: 'Your password has been changed',
                   text:    'Hello,\n\n' +
                            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
               };
               smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('success', 'Success! Your password has been changed.');
                   done(err);
               });
            }
           ], function(err) {
                 req.flash("error", "An error occured. Sys Msg: " + err.message);
                //  res.redirect('/campgrounds');
       });
   });
   
   module.exports = router;
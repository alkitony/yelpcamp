// Define express and router object
   var express         = require("express"),
       router          = express.Router(),
       passport        = require("passport"),
       expressSession  = require("express-session"),
       nodemailer      = require("nodemailer"),
       ses             = require('nodemailer-ses-transport'),
       aws             = require('aws-sdk'),
       bcrypt          = require("bcrypt-nodejs"),          
       async           = require("async"),
       crypto          = require("crypto"),
       envGlobalObj    = require("../envGlobalObj.js");

// Define Databases
   var User            = require("../models/user");
   
// ========================
// Authorization Routes
// ========================

// Show forgot password form
   router.get("/", function(req, res){
      res.render("users/forgot");
   });
   
// Send out forgot password email
   router.post("/", function(req, res, next) {
       async.waterfall(
          [
           function(done) {
              crypto.randomBytes(20, function(err, buf) {
                  var token = buf.toString('hex');
                  done(err, token);
              });
           },
           function(token, done) {
              User.findOne({ email: req.body.email }, function(err, user) {
                 if (!user) {
                     req.flash('error', 'No account with that email address exists.');
                     return res.redirect('/forgot');
                 }
                 user.resetPasswordToken = token;
                 user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                 user.save(function(err) {
                    done(err, token, user);
                 });
              });
           },
           function(token, user, done) {
           
            //  awsses.config({
            //       accessKeyId:     envGlobalObj.accessKeyId,
            //       secretAccessKey: envGlobalObj.secretAccessKey,
            //       region:          envGlobalObj.region,
            //  });
       
             var mailses = new aws.SES({
                  accessKeyId:     envGlobalObj.accessKeyId,
                  secretAccessKey: envGlobalObj.secretAccessKey,
                  region:          envGlobalObj.region
             });

       
             // load AWS SES
            //  var mailses = new awsses.SES({apiVersion: '2010-12-01'});
            
             var paramas = {
                   Source: envGlobalObj.appEmailAddress,
                   Destination: { ToAddresses: [user.email]},
                   Message: {
                     Subject: { Data: "Campground Password Reset"},
                     Body: { Text: { Data: "Test is this working" } }
                   }
                 };
            
             mailses.sendEmail ( paramas, function(err, data) {
                  console.log(err);
                  req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                  res.redirect("/yelpcamp/campgrounds");
                  done(err, 'done');
             })

            //   var smtpTransport = nodemailer.createTransport(
            //       ses({
            //       accessKeyId:     envGlobalObj.accessKeyId,
            //       secretAccessKey: envGlobalObj.secretAccessKey,
            //       region:          envGlobalObj.region,
            //       })
            //   );
            //   console.log(smtpTransport);
            //   var mailOptions = {
            //       to:      user.email,
            //       from:    envGlobalObj.appEmailAddress,
            //       subject: 'Campground Password Reset',
            //       text:    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            //                 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            //                 'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            //                 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            //   };
            //   console.log(mailOptions);
            //   smtpTransport.sendMail(mailOptions, function(err) {
            //       console.log(err);
            //       req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            //       res.redirect("/yelpcamp/campgrounds");
            //       done(err, 'done');
            //   });
          }
          ], function(err) {
                if (err) 
                   {
                    req.flash("error", err.message);
                    return next(err);
                   }
             }
       );
   });
   
   module.exports = router;
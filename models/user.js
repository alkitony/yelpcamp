var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Define Campground schema
   var userSchema = new mongoose.Schema({
      username:     { type: String, required: true, unique: true },
      email:        { type: String, required: true, unique: true },
      password:     { type: String },
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      firstName:    String,
      lastName:     String
   });
   
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", userSchema);
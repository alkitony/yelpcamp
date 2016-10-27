// Define a global object to contain all environment and security variables
// This is used by app.js, reset.js, forgot.js
   var envGlobalObj = {
      appDatabase:      process.env.YCAPPDATABASEURL,
      sessionDatabase:  process.env.YCSESSIONDATABASEURL,
      secretPhrase:     process.env.YCSECRETPHRASE,
      appEmailAddress:  process.env.YCAPPEMAILADDRESS,
      appEmailPassword: process.env.YCAPPEMAILPASSWORD
   }
 module.exports = envGlobalObj
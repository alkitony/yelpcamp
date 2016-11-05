// Define a global object to contain all environment and security variables
// This is used by app.js, reset.js, forgot.js
   var envGlobalObj = {
      appDatabase:      process.env.YCAPPDATABASEURL,
      sessionDatabase:  process.env.YCSESSIONDATABASEURL,
      secretPhrase:     process.env.YCSECRETPHRASE,
      accessKeyId:      process.env.YCMAILACCESSKEYID,
      secretAccessKey:  process.env.YCMAILSECRETACCESSKEY,
      rateLimit:        process.env.YCRATELIMIT,
      region:           process.env.YCAWSREGION,
      appEmailAddress:  process.env.YCAPPEMAILADDRESS,
      websitedir:        process.env.WEBSITEDIRECTORY
   }
 module.exports = envGlobalObj
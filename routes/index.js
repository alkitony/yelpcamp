// Define express and router object
   var express = require("express");
   var router  = express.Router(); 
   
// base route
   router.get("/", function (req, res) {
      res.render("landing"); 
   });

module.exports = router;
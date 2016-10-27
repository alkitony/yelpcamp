// Iniitalize Packages used by Yelp App. All require statements are here except for routes and database definitions
   var express          = require("express"),
       app              = express(),
       bodyParser       = require("body-parser"),
       mongoose         = require("mongoose"),
       passport         = require("passport"),
       LocalStrategy    = require("passport-local"),
       expressSession   = require("express-session"),
       MongoStore       = require('connect-mongo/es5')(expressSession),
       methodOverride   = require("method-override"),
       flash            = require("connect-flash"),
       cookieParser     = require("cookie-parser"),
       envGlobalObj     = require("./envGlobalObj.js");

// Define Route files
   var routePath        = "./routes/"
   var campgroundRoutes = require(routePath + "campgrounds.js"),
       commentRoutes    = require(routePath + "comments.js"),
       indexRoutes      = require(routePath + "index.js"),
       registerRoutes   = require(routePath + "register.js"),
       logInOutRoutes   = require(routePath + "logInOut.js"),
       forgotRoutes     = require(routePath + "forgot.js"),
       resetRoutes      = require(routePath + "reset.js");

// Define location and/or methods used by packges
   app.use(express.static(__dirname+"/public"));
   app.use(bodyParser.urlencoded({extended: true}));
   app.set("view engine", "ejs");
   app.use(methodOverride("_method"));
   app.use(flash());

// Database setup, schema definition
   // mongoose.connect("mongodb://localhost/yelpCamp-v11");
   mongoose.connect(envGlobalObj.appDatabase);
   var Campground = require("./models/campground"),
       Comment    = require("./models/comment"),
       User       = require("./models/user"),
       seedDB     = require("./seeds");

// SECURITY: PASSPORT CONFIGUREATION: Security Setup
   app.use(cookieParser());
   app.use(expressSession({
       secret: envGlobalObj.secretPhrase,
       resave: false,
       saveUninitialized: false,
       store: new MongoStore({ url: envGlobalObj.sessionDatabase, autoReconnect: true})
   }));
   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(new LocalStrategy(User.authenticate()));
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
   
   app.get("/*", function(req, res, next) {
      if(typeof req.cookies['connect.cid'] !== 'undefined') {
         console.log(req.cookies['connect.cid']);
      }
      next();
   });
   
   
// Seed Database. Seed database must happen after db and security setup
   // seedDB();
   
// Set user object and message for all routes
   app.use(function(req, res, next){
       res.locals.currentUser = req.user;
       res.locals.error       = req.flash("error");
       res.locals.success     = req.flash("success");
       next();
   });

// Add routes to the app
   app.use("/campgrounds", campgroundRoutes);
   app.use("/campgrounds/:id/comments", commentRoutes);
   app.use("/register", registerRoutes);
   app.use(logInOutRoutes);
   app.use("/forgot", forgotRoutes);
   app.use("/reset/:token", resetRoutes);
   app.use(indexRoutes);

// App Listener 
   app.listen(process.env.PORT, process.env.IP, function() {
      console.log("Running Yelp Camp v11 has started");
   });
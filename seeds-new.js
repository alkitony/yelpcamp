var mongoose    = require("mongoose"),
    User        = require("./models/user")
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    async       = require("async"),
    passport    = require("passport");
    
// Seed Database
   var userList = [
       {
        username:  "bangbang",
        email:     "alkitony1@gmail.com",
        password:  "bingobango",
        firstName: "Bingo",
        LastName:  "Bango",
       },
       {
        username:  "sleepin",
        email:     "alkitony@me.com",
        password:  "snoring",
        firstName: "Sleepy",
        LastName:  "Drawf"
       }
       ]
       
   var campgroundList = [
       {
        name:        "Salmon Creek",  
        image:       "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description: "Siphon, cappuccino, french press seasonal grinder caffeine coffee java. "
       }, 
       {
        name:        "Bluebery Hike", 
        image:       "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Foam est, shop as macchiato whipped beans. Instant rich sit froth, black "
       }, 
       {
        name:        "Uphill Climb",     
        image:       "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description: "Spoon, affogato extra at lungo blue mountain sweet doppio mug aged aromatic "
       },
       {
        name:        "Zig Zag Hill",     
        image:       "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Irish, as rich, galão shop, cup irish qui pumpkin spice barista acerbic."
       },
       {
        name:        "Trout Creek",      
        image:       "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Crema, so, extra flavour et dark fair trade. At and aged blue mountain "
       },
       {
        name:        "Blackberry Hike",  
        image:       "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Sit, affogato latte acerbic medium roast est caffeine. Chicory, caramelization"
       },
       {
        name:        "Valley Climb",     
        image:       "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
        description: "Beans doppio coffee that lungo qui variety iced cup whipped shop."
       },
       {
        name:        "Circle Hill",      
        image:       "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
        description: "Aromatic ut whipped spoon that percolator single shot. Spoon, mug,"
       },
       {
        name:        "Bass Creek",       
        image:       "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Eu, et, kopi-luwak aged, americano caramelization caffeine medium café au lait."
       },
       {
        name:        "Apple Hike",       
        image:       "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Shop acerbic fair trade mocha, seasonal breve whipped frappuccino plunger pot"
       },
       {
        name:        "Lazy Climb",       
        image:       "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "Rich, aged irish roast spoon cinnamon white blue mountain arabica steamed. "
       },
       {
        name:        "Switch back Mtn",  
        image:       "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Seasonal coffee iced, flavour, con panna, roast et half and half blue"
       },
       ];
       
var commentList = [
       {
        comment: "Lucy - george: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek.",
        author:  "Lucy"
       },
       {
        comment: "Charlie: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek. ",
        author:  "Charlie"
       }
    ];

// Seed the Camping database with 2 users, 11 campsites and 2 comments per site
   function seedDB() {
      async.waterfall([
         // clear out campgrounds and comments
         function(done) {
            Campground.remove({}, function(err) {
               done(err); 
            });
         },
         // clear out users
         function(done) {
             User.remove({}, function(err) {
                done(err); 
             });
         },
         // Add Users to database
         function(done) {
             for (var i = 0; i < userList.length; i++) {
                var newUser = new User(userList[i]);
                User.register(newUser, userList[i].password, function(err, user){
                   if (err) {
                      done(err); 
                   } else {
                     
                     // Add User's username and Id to the Campground Array.
                     // Campground 0-5 will get first user
                     // Campground 6-11 will get second user
                     var whichCamp = ((i = 0) ? 0 : ((campgroundList.length/2) - 1))
                     var whichCampgrounds = ((i = 0) ? (campgroundList.length/2) : (campgroundList.length))       
                     for (var a = whichCamp; a < whichCampgrounds; a++) {
                         campgroundList[whichCamp].author = { username : user.username,
                                                              _id      : user._id}
                     }
                     // Add User's username and Id to the Comment Array.
                     // Comment 0 will get first user
                     // Comment 1 will get second user
                     commentList[i].author = { username : user.username,
                                               _id      : user._id};
                     done(err);
                   }
                });
             };
         },
         // Add Campgrounds and comments to database
         function(done) {
            for (var i = 0; i < campgroundList.length; i++) {
               async.waterfall([
                  async.apply(function(campSite, done) {
                     commentList.forEach(function(commentItem){
                        Comment.create(commentItem,function(err,commentSaved){
                           if (err) {
                              done(err);
                           } else {
                              campSite.comments = campSite.comments + commentSaved._id;  
                              done(err, campSite)
                           }
                        });
                     });  
                  }, campgroundList[i]),
                  function(done, campSite) {
                     Campground.create(campSite, function(err,addedCampground){
                        if(err) {
                           done(err);
                        } else {
                           done(err);
                        }
                     });
                  }],
                  function(err) {
                     console.log(err)
                  }
               );
            };
         }],
         function(err) {
            console.log(err);
         }
     )
    }

module.exports = seedDB;

//Campground.create(campground, function(err,addedCampground){
//                   if(err) {
//                       console.log(err);
//                   } else {
//                       console.log(addedCampground.name);
//                       // Create Comment
//                       commentList.forEach(function(commentItem){
//                           Comment.create(
//                                         //   {
//                                         //   comment: "Charlie: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek. Gamorrean bespin chewbacca ben hutt mara. Maul yavin antilles mace jabba vader palpatine. Chewbacca darth wicket wedge. Bothan jar calamari skywalker mothma. Luke darth calrissian lobot mandalore. Yavin ewok padmé dooku luke calamari hutt. Darth moff dantooine moff padmé hutt owen. Secura palpatine r2-d2 antilles droid wampa skywalker darth zabrak. Fett mothma amidala skywalker darth sidious solo hutt. Moff cade ahsoka endor kamino darth. Boba bothan hoth leia moff mara luuke. Kenobi ackbar kenobi darth kenobi fett. Jinn kessel jar kessel utapau. Skywalker tatooine droid skywalker skywalker darth. Dagobah mustafar ben luuke darth wicket chewbacca jango. Fett anakin darth ventress dantooine mandalorians. Hoth han mon jinn anakin jabba. Antilles calrissian aayla ben. Skywalker kit fisto jade windu moff lars skywalker. ",
//                                         //   author:  "Charlie"
//                                         //   },
//                                         commentItem,
//                                           function(err,commentSaved){
//                               if (err) {
//                                  console.log(err);
//                               } else {
//                                  addedCampground.comments.push(commentSaved);
//                                  addedCampground.save(function(err, complCampground){
//                                      if (err) {
//                                          console.log(err);
//                                      } else {
//                                          console.log("added complete campground");
//                                      }
//                                  });                                       
//                               } 
//                           }); 
//                       });
//                   }
//               });
//             };
//         }
//         ];
//   }

































//               Campground.create(campgroundList[i], function(err, insertedCampground) {
//                   if(err) 
//                      { done(err); }
//                   else 
//                      async.waterfall([
//                         function(done) {
                            
//                         }
//                      { done(err, insertedCampground); }

//               });





                  
//                   // Add a campground to the database
//                   function(done) {
//                   },
//                   // Add a comment to the database 
//                   function(campsite, done, )
                  
//               ]
               
                
                
//                 )
//                 var whichUser = (i < (campgroundList.length / 2) ? 0 : 1)
//                 User.findOne({'username' : userList[whichUser].username}, function(err,foundUser){
//                     if (err) {
//                         done(err, "done");
//                     } else {
//                         // Get Data from form 
//                         campgoundList[i].author = {'username' : foundUser.username,
//                                                   '_id' :;
//                         newCampground.author = req.user;
                                             
//                         // Add new campground to database
//                         Campground.create(newCampground, function(err, insertedCampground) {
//                           if(err){
//                               console.log("Something went wrong");
//                               console.log(err);
//                           }
//                           else {
//                               res.redirect("/campgrounds");
//                           }
//                         });
//                     }
//                 })

//                       array[i]
//              }
              
              
//               for (var i = Things.length; i--; ) {
//                   Things[i];
//               }
          
//          ]
      
//       )
//   };
//     Campground.remove({}, function(err){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("removed campgrounds");
//             console.log("adding campgrounds");
//             campgroundList.forEach(function(campground){
//                 Campground.create(campground, function(err,addedCampground){
//                   if(err) {
//                       console.log(err);
//                   } else {
//                       console.log(addedCampground.name);
//                       // Create Comment
//                       commentList.forEach(function(commentItem){
//                           Comment.create(
//                                         //   {
//                                         //   comment: "Charlie: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek. Gamorrean bespin chewbacca ben hutt mara. Maul yavin antilles mace jabba vader palpatine. Chewbacca darth wicket wedge. Bothan jar calamari skywalker mothma. Luke darth calrissian lobot mandalore. Yavin ewok padmé dooku luke calamari hutt. Darth moff dantooine moff padmé hutt owen. Secura palpatine r2-d2 antilles droid wampa skywalker darth zabrak. Fett mothma amidala skywalker darth sidious solo hutt. Moff cade ahsoka endor kamino darth. Boba bothan hoth leia moff mara luuke. Kenobi ackbar kenobi darth kenobi fett. Jinn kessel jar kessel utapau. Skywalker tatooine droid skywalker skywalker darth. Dagobah mustafar ben luuke darth wicket chewbacca jango. Fett anakin darth ventress dantooine mandalorians. Hoth han mon jinn anakin jabba. Antilles calrissian aayla ben. Skywalker kit fisto jade windu moff lars skywalker. ",
//                                         //   author:  "Charlie"
//                                         //   },
//                                         commentItem,
//                                           function(err,commentSaved){
//                               if (err) {
//                                  console.log(err);
//                               } else {
//                                  addedCampground.comments.push(commentSaved);
//                                  addedCampground.save(function(err, complCampground){
//                                      if (err) {
//                                          console.log(err);
//                                      } else {
//                                          console.log("added complete campground");
//                                      }
//                                  });                                       
//                               } 
//                           }); 
//                       });
//                   }
//                 });
//             });            
//         }
//     });
   

// module.exports = seedDB;
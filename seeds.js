var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

// Seed Data
   var campgroundList = [
       {
        name: "Salmon Creek",  
        image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description: "Siphon, cappuccino, french press seasonal grinder caffeine coffee java. Galão, cultivar affogato lungo viennese single shot cortado turkish skinny robusta. Qui, dark, siphon rich mocha frappuccino, instant half and half flavour arabica cinnamon. Grinder trifecta, seasonal, steamed cup body sugar trifecta medium. Aroma, crema, rich, flavour cinnamon, kopi-luwak, plunger pot grinder fair trade cappuccino ristretto."
       }, 
       {
        name: "Bluebery Hike", 
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Foam est, shop as macchiato whipped beans. Instant rich sit froth, black galão and bar organic black café au lait. Breve sweet, blue mountain, flavour decaffeinated wings cream robust mocha ristretto plunger pot. Aged beans affogato plunger pot and kopi-luwak grounds. Coffee aromatic sweet, shop, single origin affogato, aftertaste half and half shop café au lait rich."
       }, 
       {
        name: "Uphill Climb",     
        image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description: "Spoon, affogato extra at lungo blue mountain sweet doppio mug aged aromatic carajillo. Cultivar variety turkish americano arabica latte redeye siphon viennese. Rich, robust, skinny frappuccino id single origin coffee. Single shot pumpkin spice frappuccino doppio french press qui whipped. Lungo seasonal dripper in, acerbic that cultivar chicory robusta."
       },
       {
        name: "Zig Zag Hill",     
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Irish, as rich, galão shop, cup irish qui pumpkin spice barista acerbic. In cream, extraction grinder, mazagran, chicory froth turkish medium sugar filter espresso. Cinnamon at white americano, white caffeine crema sugar flavour. Coffee java half and half, single shot pumpkin spice, id ut fair trade trifecta single shot coffee. Half and half variety acerbic white in, fair trade dark decaffeinated aged pumpkin spice organic."
       },
       {
        name: "Trout Creek",      
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Crema, so, extra flavour et dark fair trade. At and aged blue mountain doppio skinny pumpkin spice. Grinder froth body, pumpkin spice irish cup roast, galão cortado strong robust café au lait. A in, eu steamed flavour wings caffeine wings sit kopi-luwak. French press, latte ristretto robust rich, robust spoon robust con panna kopi-luwak milk."
       },
       {
        name: "Blackberry Hike",  
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Sit, affogato latte acerbic medium roast est caffeine. Chicory, caramelization, seasonal aged body milk roast. Sweet breve cortado caffeine that iced, wings ristretto plunger pot sweet chicory. Grounds fair trade americano macchiato, acerbic aroma whipped chicory extraction. Filter turkish extra sit filter frappuccino, kopi-luwak to go frappuccino aromatic strong shop."
       },
       {
        name: "Valley Climb",     
        image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
        description: "Beans doppio coffee that lungo qui variety iced cup whipped shop. French press medium milk sugar a to go wings fair trade roast spoon seasonal milk. Fair trade, black robust cup, skinny and barista ut aromatic. Macchiato wings white affogato ristretto grounds aroma bar macchiato. Cappuccino half and half est mazagran aftertaste coffee dripper cultivar."
       },
       {
        name: "Circle Hill",      
        image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
        description: "Aromatic ut whipped spoon that percolator single shot. Spoon, mug, extra et, organic pumpkin spice mazagran dripper java macchiato cortado. Robust saucer percolator, in lungo iced carajillo cappuccino turkish french press. Ristretto macchiato dark dripper as grinder, instant foam dark irish doppio. Caramelization, cinnamon rich shop pumpkin spice flavour robusta black in sit white mocha."
       },
       {
        name: "Bass Creek",       
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Eu, et, kopi-luwak aged, americano caramelization caffeine medium café au lait. Instant that cup to go chicory instant decaffeinated lungo a macchiato. To go, grounds half and half froth breve turkish lungo french press beans. Brewed, viennese wings arabica redeye doppio grinder aftertaste percolator chicory aged. Siphon, steamed trifecta coffee robusta est arabica extraction sweet extra."
       },
       {
        name: "Apple Hike",       
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "Shop acerbic fair trade mocha, seasonal breve whipped frappuccino plunger pot instant strong crema. Crema aged ristretto aftertaste crema acerbic organic. Lungo coffee chicory caramelization blue mountain and white plunger pot pumpkin spice lungo. Mug, percolator iced cultivar latte grounds dark extra. Eu, milk beans plunger pot doppio spoon breve frappuccino."
       },
       {
        name: "Lazy Climb",       
        image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "Rich, aged irish roast spoon cinnamon white blue mountain arabica steamed. Acerbic variety, robust, iced saucer at cinnamon, shop java carajillo viennese single origin. Con panna ut mocha id et white single shot extra decaffeinated body carajillo. Robusta, chicory half and half caramelization strong siphon robusta café au lait coffee and robust. Black café au lait a irish cultivar, filter dripper café au lait single shot java medium robust."
       },
       {
        name: "Switch back Mtn",  
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Seasonal coffee iced, flavour, con panna, roast et half and half blue mountain shop and mazagran. Filter crema latte cortado wings frappuccino ut, blue mountain aromatic doppio plunger pot mazagran. As, crema arabica, cinnamon at a aged acerbic. Acerbic, frappuccino ristretto strong flavour shop siphon cream qui percolator. Bar seasonal extra strong dark, white single origin turkish breve caramelization."
       },
       ];

var commentList = [
       {
        comment: "Lucy - george: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek. Gamorrean bespin chewbacca ben hutt mara. Maul yavin antilles mace jabba vader palpatine. Chewbacca darth wicket wedge. Bothan jar calamari skywalker mothma. Luke darth calrissian lobot mandalore. Yavin ewok padmé dooku luke calamari hutt. Darth moff dantooine moff padmé hutt owen. Secura palpatine r2-d2 antilles droid wampa skywalker darth zabrak. Fett mothma amidala skywalker darth sidious solo hutt. Moff cade ahsoka endor kamino darth. Boba bothan hoth leia moff mara luuke. Kenobi ackbar kenobi darth kenobi fett. Jinn kessel jar kessel utapau. Skywalker tatooine droid skywalker skywalker darth. Dagobah mustafar ben luuke darth wicket chewbacca jango. Fett anakin darth ventress dantooine mandalorians. Hoth han mon jinn anakin jabba. Antilles calrissian aayla ben. Skywalker kit fisto jade windu moff lars skywalker. ",
        author:  "Lucy"
       },
       {
        comment: "Charlie: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek. Gamorrean bespin chewbacca ben hutt mara. Maul yavin antilles mace jabba vader palpatine. Chewbacca darth wicket wedge. Bothan jar calamari skywalker mothma. Luke darth calrissian lobot mandalore. Yavin ewok padmé dooku luke calamari hutt. Darth moff dantooine moff padmé hutt owen. Secura palpatine r2-d2 antilles droid wampa skywalker darth zabrak. Fett mothma amidala skywalker darth sidious solo hutt. Moff cade ahsoka endor kamino darth. Boba bothan hoth leia moff mara luuke. Kenobi ackbar kenobi darth kenobi fett. Jinn kessel jar kessel utapau. Skywalker tatooine droid skywalker skywalker darth. Dagobah mustafar ben luuke darth wicket chewbacca jango. Fett anakin darth ventress dantooine mandalorians. Hoth han mon jinn anakin jabba. Antilles calrissian aayla ben. Skywalker kit fisto jade windu moff lars skywalker. ",
        author:  "Charlie"
       }
    ];

function seedDB() {
    Campground.remove({}, function(err){
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds");
        //     console.log("adding campgrounds");
        //     campgroundList.forEach(function(campground){
        //         Campground.create(campground, function(err,addedCampground){
        //           if(err) {
        //               console.log(err);
        //           } else {
        //               console.log(addedCampground.name);
        //               // Create Comment
        //               commentList.forEach(function(commentItem){
        //                   Comment.create(
        //                                 //   {
        //                                 //   comment: "Charlie: Lucas ipsum dolor sit amet mustafar dooku yavin mon grievous han mon skywalker binks luke. Mace binks watto biggs chewbacca. Lando amidala baba amidala dooku ponda moff binks. Tusken raider moff binks palpatine. Kashyyyk ackbar wookiee leia leia twi'lek. Gamorrean bespin chewbacca ben hutt mara. Maul yavin antilles mace jabba vader palpatine. Chewbacca darth wicket wedge. Bothan jar calamari skywalker mothma. Luke darth calrissian lobot mandalore. Yavin ewok padmé dooku luke calamari hutt. Darth moff dantooine moff padmé hutt owen. Secura palpatine r2-d2 antilles droid wampa skywalker darth zabrak. Fett mothma amidala skywalker darth sidious solo hutt. Moff cade ahsoka endor kamino darth. Boba bothan hoth leia moff mara luuke. Kenobi ackbar kenobi darth kenobi fett. Jinn kessel jar kessel utapau. Skywalker tatooine droid skywalker skywalker darth. Dagobah mustafar ben luuke darth wicket chewbacca jango. Fett anakin darth ventress dantooine mandalorians. Hoth han mon jinn anakin jabba. Antilles calrissian aayla ben. Skywalker kit fisto jade windu moff lars skywalker. ",
        //                                 //   author:  "Charlie"
        //                                 //   },
        //                                 commentItem,
        //                                   function(err,commentSaved){
        //                       if (err) {
        //                          console.log(err);
        //                       } else {
        //                          addedCampground.comments.push(commentSaved);
        //                          addedCampground.save(function(err, complCampground){
        //                              if (err) {
        //                                  console.log(err);
        //                              } else {
        //                                  console.log("added complete campground");
        //                              }
        //                          });                                       
        //                       } 
        //                   }); 
        //               });
        //           }
        //         });
        //     });            
        // }
    });
}

module.exports = seedDB;
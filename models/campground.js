var mongoose = require("mongoose");

// Define Campground schema
   var campgroundSchema = new mongoose.Schema({
      name:        String,
      image:       String,
      description: String,
      price:       Number,
      addDate:     Date,
      updateDate:  Date,
      author:      {_id: {type: mongoose.Schema.Types.Object,
                         ref: "User"
                        },
                    username: String
                   },
      comments:    [{
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Comment"
                   }]
   });

module.exports = mongoose.model("Campground", campgroundSchema);
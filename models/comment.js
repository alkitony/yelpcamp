var mongoose = require("mongoose");

// Define comments schema
   var commentsSchema = new mongoose.Schema({
      comment:    String,
      addDate:    Date,
      updateDate: Date,
      author:     {
                    _id: {
                          type: mongoose.Schema.Types.Object,
                          ref: "User"
                        },
                    username: String
                  }
   });

module.exports = mongoose.model("Comment", commentsSchema);
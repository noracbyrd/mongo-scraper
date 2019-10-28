var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  // `author` must be of type String
  text: {
    type: String,
    unique: true
  },
  // `title` must be of type String
 
});
var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
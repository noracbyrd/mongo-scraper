var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `author` must be of type String
  title: {
    type: String,
    unique: true
  },
  // `title` must be of type String
  content: String,
  link: String,
  
 
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Book model
module.exports = Article;

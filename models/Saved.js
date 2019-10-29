var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var SavedSchema = new Schema({
  // `author` must be of type String
  title: {
    type: String,
    unique: true
  },
  // `title` must be of type String
  content: String,
  link: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
 
});

// This creates our model from the above schema, using mongoose's model method
var Saved = mongoose.model("Saved", SavedSchema);

// Export the Book model
module.exports = Saved;

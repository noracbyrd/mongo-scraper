var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  content: String,
  link: String,
  //this is spposed to link the comments to the Saved articles, but I haven't managed to actually make it work...
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;

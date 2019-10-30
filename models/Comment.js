const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: {
    type: String,
    unique: true
  },
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
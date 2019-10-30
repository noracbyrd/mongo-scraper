const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  content: String,
  link: String,
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

// Setting up the port - heroku and otherwise
var PORT = process.env.PORT || 8056;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Initialize Express
var app = express();

// Setting up the static folder for the frontend
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/news_controller.js");

app.use(routes);




app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
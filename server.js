// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

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

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/news_controller.js");

app.use(routes);

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "";
var collections = [""];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
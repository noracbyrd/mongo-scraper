// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Setting up the port - heroku and otherwise
const PORT = process.env.PORT || 8056;

// setting up MongoDB & Mongoose and & Heroku's version
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Initialize Express
const app = express();

// Setting up the static folder for the frontend
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for testing, keeping it in for now since this site doesn't work fully, *sniff*
app.use(logger("dev"));

// Set Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/news_controller.js");
app.use(routes);

// ye olde listener
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
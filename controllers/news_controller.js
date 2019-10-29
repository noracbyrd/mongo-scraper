// dependencies
var express = require("express");
var router = express.Router();
var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");
var mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
// @ this is probably wrong but at least is the shell for rendering all the articles in the database

router.get("/", function (req, res) {
    // remember to put name of the table in
    db.Article.find({})
        .then(function (dbArticle) {
            var hbsObject = {
                story: dbArticle
            }

            res.render("../views/index", hbsObject);
        })
        .catch(function (err) {
            res.json(err);
        })
})

router.get("/saved", function (req, res) {
    // remember to put name of the table in
    db.Saved.find({})
        .populate("comments")
        .then(function (dbSaved) {
            console.log(dbSaved);
            var hbsObject = {
                saved: dbSaved
            }

            res.render("../views/saved", hbsObject);
        })
        .catch(function (err) {
            res.json(err);
        })
})


// homepage route
// @ might need to do separate scrape route - have / display articles from the database. oooohhhhhhhhh. and you can do it when you press the scrape button!
// @ home route will just grab what's been scraped & saved; scrape button will rescrape
// @ cf activity 11
// @ mongo don't forget when adding need to ADD MANY {multi:true} or whatever
router.get("/scrape", function (req, res) {
    axios.get("http://www.irishmusicmagazine.com/news/").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape


        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $(".post").each(function (i, element) {
            var results = {};
            results.title = $(this).find(".storytitle").text();
            results.content = $(this).find("p").text();
            results.link = $(this).find("a").attr("href");

            db.Article.create(results)
                .then(function (dbArticle) {
                    // View the added result in the console
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });


        });
        res.send("scraped");
    });
});
// @ this is going to need to have the populate function 
// @ associating the comments with the article
router.post("/api/saved", function (req, res) {
    db.Saved.create(req.body).then(function (dbSaved) {
        res.json(dbSaved);
    });
});

router.post("/api/comments", function (req, res) {
    db.Comment.create(req.body).then(function (dbComment) {
        res.json(dbComment);
    })
})


// @ { new: true } LOOK INTO THIS


module.exports = router;
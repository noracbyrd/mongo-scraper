// dependencies
const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// route to display the homepage, including all scraped articles
router.get("/", function (req, res) {
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

// route to display the page that holds all the articles that have been saved
router.get("/saved", function (req, res) {
    db.Saved.find({})
        // this populate isn't currently working but ideally the comments would be displayed with the article they're associated with 
        .populate("comments")
        console.log(db.Saved.comments)
    console.log("did populate run?")
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

// route to actually scrape the data from Irish Music Magazine
router.get("/scrape", function (req, res) {
    axios.get("http://www.irishmusicmagazine.com/news/").then(function (response) {
        var $ = cheerio.load(response.data);
        $(".post").each(function (i, element) {
            var results = {};
            results.title = $(this).find(".storytitle").text();
            results.content = $(this).find("p").text();
            results.link = $(this).find("a").attr("href");
            db.Article.create(results)
                .then(function (dbArticle) {
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("scraped");
    });
});

// when the 'save article' button is pressed, this route saves that article's info to the saved articles collection
router.post("/api/saved", function (req, res) {
    db.Saved.create(req.body).then(function (dbSaved) {
        res.json(dbSaved);
    });
});

// this is *supposed* to create comments in conjunction with the article they were generated from, but so far it's not quite working as intended
router.post("/api/comments", function (req, res) {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            return db.Saved.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true })
        }).then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        })
})

module.exports = router;
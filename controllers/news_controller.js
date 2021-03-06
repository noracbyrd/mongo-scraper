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

// when the 'save article' button is pressed, this route saves that article's info to the saved articles collection
router.post("/api/saved", function (req, res) {
    db.Saved.create(req.body).then(function (dbSaved) {
        res.json(dbSaved);
    });
});

// currently this route displays all the comments on a blank page, instead of in the modal where I want then to go. 
router.get("/thecomments", function (req, res) {
    db.Comment.find({})
        .then(function (dbComment) {
            var hbsObject = {
                comment: dbComment
            }
            res.render("../views/partials/commentary", hbsObject)
        }).catch(function (err) {
            res.json(err)
        })
})

// this is *supposed* to create comments in conjunction with the article they were generated from, but so far it's not quite working as intended. Comments are added to the database, but they aren't being connected to anything.
router.post("/api/comments", function (req, res) {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            var hbsObject = {
                comment: dbComment
            }
            res.render("../views/partials/commentary", hbsObject);
            return db.Saved.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true })
        })
        .catch(function (err) {
            res.json(err)
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



module.exports = router;
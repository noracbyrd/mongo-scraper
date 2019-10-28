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
    .then(function(dbArticle) {
        console.log(dbArticle);
        var hbsObject = {
            story: dbArticle
        }

        res.render("../views/index", hbsObject);
    })
    .catch(function(err){
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

            


            // Save these results in an object that we'll push into the results array we defined earlier
            // results = new Article(title,content,link);
            // results.title = title;
            // results.content = content;
            // results.link = link;

            // results.push({
            //     title: title,
            //     content: content,
            //     link: link
           
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
router.get("/saved", function (req, res) {
    res.render("../views/saved");
});


// @ { new: true } LOOK INTO THIS

// router.get("/", function(req, res) {
//     cat.all(function(data) {
//       var hbsObject = {
//         cats: data
//       };
//       console.log(hbsObject);
//       res.render("index", hbsObject);
//     });
//   });


module.exports = router;
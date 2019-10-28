// dependencies
var express = require("express");
var router = express.Router();
var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");

// homepage route
router.get("/", function (req, res) {
    var hbsObject;
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
            var title = $(element).find(".storytitle").text();
            var content = $(element).find("p").text();
            var link = $(element).find("a").attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.title = title;
            results.content = content;
            results.link = link;

            // results.push({
            //     title: title,
            //     content: content,
            //     link: link
            hbsObject = {
                story: results
            }
            console.log(hbsObject);
        
        });
        
    });
    res.render("../views/index", hbsObject);
    console.log(hbsObject);
});


router.get("/saved", function (req, res) {
    res.render("../views/saved");
});


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
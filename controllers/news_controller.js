var express = require("express");
var router = express.Router();
var path = require("path");

// homepage route
router.get("/", function(req, res) {
    res.render("../views/index");
});

router.get("/saved", function(req,res){
    res.render("../views/saved");
});

module.exports = router;
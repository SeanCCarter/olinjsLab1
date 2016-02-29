var express = require('express');
var path = require('path');
var Wiki = require(path.join(__dirname,'../models/wikiModel'));

var routes = {}

routes.home = function(req, res){
  res.sendfile("./public/index.html");
}


routes.newTopic = function(req, res){

	// Get data from the JSON req
	var wikiTitle = req.body.name;
	var wikiImg = req.body.imgurl;
	var wikiText = req.body.content;

	// Create the Mongoose object
	var newWiki = new Wiki({
		name: wikiTitle,
    	imgurl: wikiImg,
    	text: wikiText
	});

	// Adds it to the database
	newWiki.save(function (err, article){
		if (err) {
			errorHandler(err, req, res);
		} else {
			res.json(article);
		}
	});
} 

module.exports = routes;

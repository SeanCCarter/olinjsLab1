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

routes.editTopic = function(req, res){
	console.log("Editing an article")
	console.log(req.body)
	var newText = req.body.text;
	var newName = req.body.name;
	var newImgurl = req.body.imgurl;
	Wiki.update({_id:req.body._id}, {text:newText, name:newName, imgurl:newImgurl}, function(err, doc){
		if (err){
			console.log("Editing error.")
			console.log(err)
			res.status(500).send("Error saving edits.")
		}
		else {
			console.log("Here's the 'doc' value.")
			console.log(doc)
			res.send()
		}
	})
}

routes.getTopicList = function(req, res){
	Wiki.find({}, {"name":1},function(err, docs){
		if (err){
			res.status(500).send("Error retrieving topic list.")
		}
		else {
			res.send(docs)
		}
	})
}

routes.getArticle = function(req, res){
	id = req.query.id;
	Wiki.findOne({_id:id}, function(err, doc){
		if (err){
			res.status(500).send("Error retrieving wiki article")
		}
		else {
			res.send(doc)
		}
	})
}

module.exports = routes;

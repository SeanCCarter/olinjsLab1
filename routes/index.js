//Contains the code for every route connected
//to the server
var express = require('express');
var path = require('path');
var Wiki = require(path.join(__dirname,'../models/wikiModel'));

var routes = {}

routes.home = function(req, res){
  res.sendfile("./public/index.html");
}


routes.newTopic = function(req, res){
	//for submiting a new wiki article to
	//the database

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
	// Get the edits and update the databse
	var newText = req.body.text;
	var newName = req.body.name;
	var newImgurl = req.body.imgurl;
	Wiki.update({_id:req.body._id}, {text:newText, name:newName, imgurl:newImgurl}, function(err, doc){
		if (err){
			res.status(500).send("Error saving edits.")
		}
		else {
			res.send()
		}
	})
}

routes.deleteTopic = function(req, res){
	// Delete topic using id
	Wiki.remove({_id:req.body.id}, function(err){
		if(err){
			res.status(500).send("Error deleting topic.")
		}
		else{
			res.send()
		}
	})
}

routes.getTopicList = function(req, res){
	//Returns a list of all wiki article names
	//to be displayed on the website sidebar
	//Mongoose alows you to only get some parameters
	Wiki.find({}, {"name":1},function(err, docs){
		if (err){
			res.status(500).send("Error retrieving topic list.")
		}
		else {
			res.send(docs)
		}
	})
}

routes.getArticle = function(req, res){ // is an article a topic? naming inconsistency?
	// find the article and its details using id
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

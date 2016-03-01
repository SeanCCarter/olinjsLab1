// Angular stuff goes here
var CardWiki = angular.module('CardWiki', ['ngRoute']);

CardWiki.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'html/home.html',
			controller: 'mainController'
		})

		.when('/newTopic', {
			templateUrl: 'html/new-topic.html',
			controller: 'addTopicController'
		})

		.when('/viewTopic/:id', {
			templateUrl: 'html/view-topic.html',
			controller: 'viewTopicController'
		})

		.when('/editTopic/:id',{
			templateUrl: 'html/edit-topic.html',
			controller: 'editTopicController'
		});
});

CardWiki.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome to this website';
});

CardWiki.controller('addTopicController', function($scope) {
    $scope.message = 'This is an add topic page.';
    $rootScope = $scope.$root
    $scope.newarticle = {name:"", imgurl:"", content:""};
    $scope.createArticle = function(){
    	$.post("/newTopic", $scope.newarticle)
	    	.done(function(data, status){
	    		$rootScope.$broadcast('articleCreated', { article: data});
	    		window.location.replace("/#/viewTopic/" + data.id);
	    	})
	    	.error(function(err, status){
	    		console.log(err);
	    		console.log(status);
	    	})
    }
});

CardWiki.controller('viewTopicController', function($scope, $routeParams) {
    $scope.message = 'View a topic page.';
    $rootScope = $scope.$root
    $.get("/getArticle",{id:$routeParams.id})
    	.done(function(data, status){
    		data.id = data._id;
    		delete data._id;
    		$scope.article = data;
    		$scope.$apply();
    	})
    	.error(function(err, status){
    		console.log(err);
    		console.log(status);
    	})
	$scope.editTopic = function(topicid){
		window.location.replace("/#/editTopic/"+topicid)
	}
	$scope.deleteTopic = function(topicid){
		$.post("/deleteTopic", {id:$routeParams.id})
			.done(function(data, status){
		    		$rootScope.$broadcast('articleDeleted', {article: $scope.article});
		    		window.location.replace("/#/");
		    	})
		    	.error(function(err, status){
		    		console.log(err);
		    		console.log(status);
		    	})
	}
});

CardWiki.controller('editTopicController', function($scope, $routeParams) {
    $scope.message = 'This is an edit topic page.';
    $rootScope = $scope.$root
    $.get("/getArticle",{id:$routeParams.id})
    	.done(function(data, status){
    		$scope.article = data;
    		$scope.$apply();
    	})
    	.error(function(err, status){
    		console.log(err);
    		console.log(status);
    	})
    $scope.editArticle = function(){
    	$.post("/editTopic", $scope.article)
	    	.done(function(data, status){
	    		$rootScope.$broadcast('articleEdited', { article: $scope.article});
	    		window.location.replace("/#/viewTopic/"+$routeParams.id);
	    	})
	    	.error(function(err, status){
	    		console.log(err);
	    		console.log(status);
	    	})
    }
});

CardWiki.controller('topicListController', function($scope){
	$.get("/getTopicList")
		.done(function(data, status){
    		$scope.topics = data;
    		$scope.topics.forEach(function(topic){
    			//Angular's angular html parser can't handle
    			//an underscore in an object property's name
    			topic.id = topic._id
    			delete topic._id
    		})
    		$scope.$apply;
    	})
    	.error(function(err, status){
    		console.log(err);
    		console.log(status);
    	})
	$scope.$on('articleCreated', function(event, args) {
		article = args.article;
		article.id = article._id;
		delete article._id;
		delete article.text;
		$scope.topics.push(article)
	})
	$scope.$on('articleEdited', function(event, args) {
		article = args.article;
		for (i=0;i<$scope.topics.length;i++){
			if ($scope.topics[i].id==article._id){
				$scope.topics[i].name = article.name
			}
		}
	})
	$scope.$on('articleDeleted', function(even, args){
		console.log(args.article.id)
		article = args.article;
		for (i=0;i<$scope.topics.length;i++){
			if ($scope.topics[i].id==article.id){
				$scope.topics.splice(i, 1);
			}
		}
	})
});


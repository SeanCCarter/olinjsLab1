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
	    		window.location.replace("/#/");
	    	})
	    	.error(function(err, status){
	    		console.log(err);
	    		console.log(status);
	    	})
    }
});

CardWiki.controller('viewTopicController', function($scope, $routeParams) {
    $scope.message = 'View a topic page.';
    console.log($routeParams.id)
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
});

CardWiki.controller('editTopicController', function($scope, $routeParams) {
    $scope.message = 'This is an edit topic page.';
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
		console.log("Article.")
		console.log(article)
		article.id = article._id;
		delete article._id;
		delete article.text;
		$scope.topics.push(article)
	})
});


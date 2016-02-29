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

		.when('/viewTopic', {
			templateUrl: 'html/view-topic.html',
			controller: 'viewTopicController'
		});
});

CardWiki.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome to this website';
});

CardWiki.controller('addTopicController', function($scope) {
    $scope.message = 'This is an add topic page.';
});

CardWiki.controller('viewTopicController', function($scope) {
    $scope.message = 'View a topic page.';
});


// .controller("mainController", function($scope) {

// 	$scope.currentArticle = null;
// 	$scope.editing = false;
// 	$scope.creating = false;
// 	$.get("/articles", {}) //TODO: Update route name
// 		//Gets all the articles from the database
// 		//Won't work if they get too bit, but neither would
// 		//our ideas for displaying it
// 		.done(function(data, status){
// 			$scope.articles = data;
// 			$scope.$apply(); //Refresh the side collumn
// 		})
// 		.error(function(err, status){
// 			console.log(err)
// 			console.log(status)
// 		});

// 	$scope.shouldShowHomepage = function(){
// 		if ($scope.currentArticle===null){return true}
// 	}

// 	$scope.shouldShowArticle = function(){
// 		if ($scope.currentArticle!==null){return true}
// 	}
// 	$scope.shouldShowEditing = function(){
// 		if ($scope.editing===true){return true}
// 	}
// 	$scope.shouldShowCreating = function(){
// 		if ($scope.creating===true){return true}
// 	}
// })

angular.module('myApp', ['ui.router','loginServices','ui.bootstrap'])
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/");
		$stateProvider
	    .state("homeState", {
	      "url": "/",
	      "templateUrl": "partials/home.tpl.html",
	      "controller":"homeCtrl"
	    });
	})
	.controller('homeCtrl',function($scope,$http,$state){
		$state.go('homeState');
		 $http.get("http://localhost/BloggingApp/api/getBlogs").then(function (response) {
		 	$scope.blogs = response.data;
		 });		 
	});
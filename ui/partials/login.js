angular.module('loginServices', ['ui.router','loginService','ui.bootstrap'])
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/login');
		$stateProvider	    		
	    .state("loginState", {
	      "url": "/login",
	      "templateUrl": "partials/login.tpl.html",
	      "controller":"loginCtrl"
	    })
	    .state("loginState.registerState", {
	      "url": "/register",
	      "templateUrl": "partials/register.tpl.html",
	      "controller":"registerCtrl"
	    })
	    .state("loginState.dashboardState", {
	      "url": "/dashboard",
	      "templateUrl": "partials/dashboard.tpl.html",
	      "controller":"dashboardCtrl"
	    });

	})
	.controller('loginCtrl',function($scope,$http,GlobalData,$state){
		 $scope.doLogin = function(){	
			$scope.promise = GlobalData.getLogin($scope.logs);
			$scope.promise.then(function(response){
				console.log(response);				
				if (response != undefined) {
					console.log(response);
					$scope.ls = response.data;
					$scope.userId = response.data[0].id;
					$scope.UserName = response.data[0].name;
					$scope.logs = {};
				}else{
					response=undefined;
					$scope.Errmessage = "Invalid Credential";
					$state.getLogin("loginState");
				}
			})			
		}	
		
	})
	.controller('registerCtrl',function($scope,$http){
		$scope.hides = true;		
		$scope.doRegister=function(){
			$http({
		        method: 'POST',
		        url: "http://localhost/BloggingApp/api/registerUser",
		        data: $scope.reg,
		        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		     }).then(function (response){
		     	$scope.reg = {};
		     })
	 	}

	})	
	.controller('dashboardCtrl', function($scope, $http) {
		$scope.loginUserBlogs = function(){
			$http({
		        method: 'GET',
		        url: "http://localhost/BloggingApp/api/getLoginUserBlogs"+"/"+$scope.userId,		        
		        //headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		     }).then(function (response){
		     	$scope.blogs = response.data;
		    })
		}

		$scope.loginUserBlogs();

		$scope.doBlogAdd = function(){
			$http({
		        method: 'POST',
		        url: "http://localhost/BloggingApp/api/addBlogs",
		        data: {
		        		 "blogheading" : $scope.blog.blogheading,
 						 "description" : $scope.blog.description,
 						 "registeruserid" : $scope.userId
		        	},
		        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		     }).then(function (response){
		     	$scope.blog = {};
		     	$scope.loginUserBlogs();
		    })
		}

	});

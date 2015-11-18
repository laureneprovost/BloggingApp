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
				$scope.ls = response.data;
				$scope.UserName = response.data[0].name;
				console.log($scope.ls);
				// if (response.data!=null && response.data!="") {										
				// 	$scope.Errmessage = undefined;
				// 	$scope.logs = {};
				// }else{
				// 	response.data=undefined;
				// 	$scope.Errmessage = "Invalid Credential";
				// }
			})			
		}	
		
	})
	.controller('registerCtrl',function($scope,$http){
		
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

		$scope.doBlogAdd = function(){
			$http({
		        method: 'POST',
		        url: "http://localhost/BloggingApp/api/addBlogs",
		        data: $scope.blog,
		        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		     }).then(function (response){
		     	$scope.blog = {};
		    })
		}

	});

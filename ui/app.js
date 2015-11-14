angular.module('myApp', ['ui.router','loginService','ui.bootstrap'])
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/");
		$stateProvider
	    .state("homeState", {
	      "url": "/",
	      "templateUrl": "partials/home.tpl.html",
	      "controller":"homeCtrl"
	    })
	    .state("loginState", {
	      "url": "/login",
	      "templateUrl": "partials/login.tpl.html",
	      "controller":"loginCtrl"
	    })
	    .state("registerState", {
	      "url": "/register",
	      "templateUrl": "partials/register.tpl.html",
	      "controller":"registerCtrl"
	    })
	    .state("dashboardState", {
	      "url": "/dashboard",
	      "templateUrl": "partials/dashboard.tpl.html",
	      "controller":"loginCtrl"
	    });

	})
	.controller('homeCtrl',function($scope,$http){
		 $http.get("http://localhost/BloggingApp/api/getBlogs").then(function (response) {
		 	$scope.blogs = response.data;
		 });
	})

	.controller('registerCtrl',function($scope,$http){
		$scope.doRegister=function(){
			$http({
		        method: 'POST',
		        url: "http://localhost/BloggingApp/api/registerUser",
		        data: $scope.reg,
		        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		     }).then(function (response){
		     })
	 	}

	})
	.controller('loginCtrl',function($scope,$http,GlobalData,$state){
		$scope.doLogin = function(){			
			var promise = GlobalData.getLogin($scope.logs);
			promise.then(function(response){
				$scope.ls = response.data;
				console.log($scope.ls);				
			})
		}
		console.log($scope.ls);
	})


/*app.controller('customersCtrl', function($scope, $http) {
	 $scope.doRegister=function(){
	 	console.log($scope.reg);
		$http({
	        method: 'POST',
	        url: "http://localhost/sqrloopz/api/authonticates",
	        data: $scope.reg,
	        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	     }).success(function(data,status){
	     	$scope.message = "Success Fully Registered";
	        	console.log(data);
	    });
	 }

	 $scope.doLogin=function(){
		$http({
	        method: 'POST',
	        url: "http://localhost/sqrloopz/api/authonticates/login/"+$scope.logs.email+"/secr/"+$scope.logs.password,
	        data: {},
	        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	     }).success(function(data,status){
	     	if(data != null && data != ""){
	     	window.location.href = 'dashboard.html'	;
	        }else{
	        		$scope.message = "Enter Valid Authontication Details";
	        }
	    });

	 }
});

app.controller('blogCtrl', function($scope, $http) {
    $http.get("http://localhost/sqrloopz/api/blogs")
    .success(function(data){
       	$scope.blogs = data;
		console.log($scope.blogs);
	});
});

app.controller('dashboardCtrl', function($scope, $http) {
	$scope.doGetUserId=function(){
	     	$http({
	        method: 'GET',
	        url: "http://localhost/sqrloopz/api/blogsofmine/"+$scope.blogr.email,
	        data: {},
	        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	     }).success(function(data,status){
	     		$scope.userid=data[0].id;
	     		$scope.blogs=data;
	        	console.log(data);
	    });
	 }

     $scope.doPostRegister=function(){
	     	console.log($scope.blog);
	     	$http({
	        method: 'POST',
	        url: "http://localhost/sqrloopz/api/blogs",
	        data: $scope.blog,
	        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	     }).success(function(data,status){
	     	if(data != null && data != " "){
	     		$scope.message = "Posted SuccessFully";
	     	}

	    });

	 }


});*/
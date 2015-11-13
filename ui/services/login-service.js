angular.module('loginService', [])
.service("GlobalData",function($http,$q,$state) {
	var self ={};
	var d = $q.defer();
	self.getLoginInfo = function (creds){
	$http({
        method: 'POST',
        url: "http://localhost/BloggingApp/api/loginUser",
        data: creds,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
     }).then(function (response){
     	var loginInfo = response;
		d.resolve(loginInfo);
     })	
	 return d.promise;
	}
	return self;
})
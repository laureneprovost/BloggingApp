angular.module('loginService', [])

.service("GlobalData",function($http,$q) {
	var self ={};
	var d = $q.defer();
	self.getLoginInfo = function (){
	 $http.get("http://localhost/BloggingApp/api/getBlogs").then(function (response) {
		var dd = response.data;
		d.resolve(dd);
	})
	 return d.promise;
	}
	return self;
})
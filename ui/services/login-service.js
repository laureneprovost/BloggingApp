angular.module('loginService', [])
.service("GlobalData",function($http,$q,$state) {
	var self ={};
	var d = $q.defer();
	self.getLogin = function (creds){
	$http({
        method: 'POST',
        url: "http://localhost/BloggingApp/api/loginUser",
        data: creds,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
     }).then(function (response){
     	if(response.data!=null && response.data!=""){
     		var loginInfo = response;      		    		
			d.resolve(loginInfo);	
			$state.go('loginState.dashboardState');		
		}else{
			d.resolve(loginInfo);
		}
     })
	 return d.promise;
	}
	return self;
})
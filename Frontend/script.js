var app=angular.module("app",[]);
app.controller("mycntrl",function($scope,$http,$window){
	 $scope.register=false;
	 $scope.login=true;
	 
	$scope.signin=function(){
	$scope.register=false;
	$scope.login=true;
	$window.location.reload();
	}
	
	$scope.signup=function(){
	$scope.register=true;
	$scope.login=false;
	}
	
	
	//sign-up services
	$scope.formsignin=function(form){
		if(form.$valid){
			$scope.data={'name':$scope.name, 'email':$scope.email,'password':$scope.password,'dob':$scope.dob,'phone':$scope.phone};
			
			$http.post("http://localhost:7000/login/addtask", $scope.data).then(function(response) {
			if(response.data.flage==true){
			   
			   $scope.regsuccess=response.data.status;
			   $scope.name='';
			   $scope.email='';
			   $scope.password='';
			   $scope.dob='';
			   $scope.phone='';
			}
		   else{
			   $scope.error=response.data.status;
		   }
	 });
			
		}
		
	}
	
	//login service
	$scope.formlogin=function(form){
		if(form.$valid){
			$scope.data={'email':$scope.lemail,'password':$scope.lpassword};
			$http.post("http://localhost:7000/login/login", $scope.data).then(function(response) {
				
				if(response.data.flage==true){
					localStorage.setItem("name",response.data.status);
					window.location="Singinsuccess.html";
				}
				else{
					$scope.lerror=response.data.status;
				}
			});
			
		}
		
	}
	
});





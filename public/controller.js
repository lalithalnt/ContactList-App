var app=angular.module("myapp",[]);
//"$scope" is needed if we minify it
app.controller("myctrl",["$scope","$http",function($scope,$http){
var refresh=function(){
$http.get("/contactList").success(function(response){
	$scope.contactList=response;
	$scope.contact="";
});
}

refresh();

//var contactList=[person1,person2,person3];
//1. add contact logic
$scope.addContact=function(){

	$http.post("/contactList",$scope.contact).success(function(response){
		console.log(response);
		refresh();
	})
}
//1.edit contact logic
$scope.editContact=function(id){
console.log(id)
$http.get("/contactList/" + id).success(function(response){
$scope.contact=response;
});
}
//1.update logic
$scope.updateContact=function(){
	$http.put("/contactList/" + $scope.contact._id,$scope.contact)
	.success(function(response){
		refresh();
	});
}
//1.remove contact logic
$scope.removeContact=function(id){
	$http.delete("/contactList/" + id)
	.success(function(response){
		refresh();
	});
}
}]);
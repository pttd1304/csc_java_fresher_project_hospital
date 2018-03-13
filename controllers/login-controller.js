'use strict';
app.controller('LoginController', ['$scope', '$http', function($scope, $http){

    

    $scope.submit = function(){
            if($scope.user.name == "admin" && $scope.user.password == "123"){
                $scope.action = "./admin/admin-users.html";
                
            } else if($scope.user.name == "doctor"){
                $scope.action = "./doctor/doctor-patients.html";
            } else if($scope.user.name == "nurse"){
                $scope.action = "./nurse/nurse.html"
            } else {
                alert("Invalid account");
                location.reload;
            }
        }
}]);

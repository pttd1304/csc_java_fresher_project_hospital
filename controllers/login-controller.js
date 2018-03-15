
app.controller('LoginController', ['$scope', '$http', function($scope, $http){

    $scope.submit = function(){
            if($scope.user.name == "admin" && $scope.user.password == "123"){
                $scope.action = "/admin.html";              
            } else if($scope.user.name == "doctor"){
                $scope.action = "/doctor.html";
            } else if($scope.user.name == "nurse"){
                $scope.action = "/nurse.html"
            } else {
                alert("Invalid account");
                location.reload;
            }
        }
}]);

/*global app*/
app.controller('mainCtrl', function($scope, $http){
    $scope.data = {};
    console.log("cc");
    $http.get('../data/patients.json').then(function(response){
        $scope.data.patients = response.data;
        
    }, function(error){
        $scope.data.error = error;
    });
});
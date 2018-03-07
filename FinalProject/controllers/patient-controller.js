app.controller('PatientController', ['$scope', '$http', function($scope, $http) { 
    $http.get('http://localhost:8080/DemoSpringMVCHibernate/users').then(function(response){
        $scope.users= response.data;

    }, function(error){
        $scope.data.error = error;
    });
}]);
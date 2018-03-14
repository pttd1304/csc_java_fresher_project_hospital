var app = angular.module("finalProject", ['datatables', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
     $routeProvider
            .when('/',{
                templateUrl : './test.html',
                controller  : 'LoginController'
            })
            .when('/admin-users', {
                templateUrl : './admin-users.html',
                controller  : 'AdminController'
            })

            .when('/admin-medicines', {
                templateUrl : './admin-medicines.html',
                controller  : 'AdminController'
            })
    
            .when('/admin-patients/profile', {
                templateUrl : './admin-persons-detail.html',
                controller  : 'AdminController'
            })

            .when('/admin-patients', {
                templateUrl : './admin-patients.html',
                controller  : 'AdminController'
            })
            .when('/nurse', {
                templateUrl : './nurse-patients.html',
                controller  : 'NurseController'
            })
            .when('/nurse-patients', {
                templateUrl : './nurse-persons-detail.html',
                controller  : 'NurseController'
            })
            .when('/doctor', {
                templateUrl : './doctor.html',
                controller  : 'DoctorController'
            })
            .when('/doctor-treatments', {
                templateUrl : './doctor-treatments.html',
                controller  : 'DoctorController'
            });

}]);



app.controller('LoginController', ['$scope', '$http', function($scope, $http){
//    
    var self = this;
    self.submit = submit;
    self.user = {id:null, username: '', password:'', cmnd:'', role:''};
    self.admin = true;
    
    function submit(){
        var req = {
        method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/login',
         headers: {         
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
         },
         data: JSON.stringify(self.user),
         dataType: 'json',
        }
        $http(req).then(function(response){
           switch (response.data){ 
               case 1: 
                   $scope.link = "admin.html";
                   $scope.greeting = "Hello, Admin!";
                   
                   break;
               case 2:
                   $scope.link = "doctor.html";
                   $scope.greeting = "Hello, Doctor!";
                   break;
               case 3:
                   $scope.link = "nurse.html";
                   $scope.greeting = "Hello, Nurse!";
                   break;
               default:
                   break;
           }
        $scope.login = !$scope.login;
        }, function(){console.log("CCC")});
    }
//
//    $scope.submit = function(){
//            if($scope.user.name == "admin" && $scope.user.password == "123"){
//                $scope.action = "/admin.html";              
//            } else if($scope.user.name == "doctor"){
//                $scope.action = "/doctor.html";
//            } else if($scope.user.name == "nurse"){
//                $scope.action = "/nurse.html"
//            } else {
//                alert("Invalid account");
//                location.reload;
//            }
//        }
}]);

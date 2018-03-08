'use strict';

app.controller('TreatmentController', ['$scope', '$http', function($scope, $http) { 
    
    var self = this;
    self.user={id:null,username:'',password:''};
    self.users=[];

    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;

    function fetchAllUsers(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/users').then(function(response){
            $scope.users= response.data;

        }, function(error){
            $scope.data.error = error;
        });
    }
    fetchAllUsers();
    
    function createUser(user){
        var req = {
         method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/ajax/addUser',
         headers: {         
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
             
         },
         data: JSON.stringify(user),
         dataType: 'json',
        }

        $http(req).then(fetchAllUsers, function(){console.log("CCC")});

    }
    function updateUser(user){
         var req = {
         method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/ajax/addUser',
         headers: {         
            'Accept': 'application/json',
            'Content-Type': 'application/json'
             
         },
         data: JSON.stringify(user),
         dataType: 'json',
        }
        console.log("Update...")
        $http(req).then(fetchAllUsers, function(){console.log("CCC")});
    }
//
    function deleteUser(user){
        console.log("Yo");
        var req = {
         method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/ajax/delete/',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'   
         },
         data: JSON.stringify(user),
         dataType: 'json',
        }
        $http(req).then(fetchAllUsers, function(){console.log("CCC")});
    }
//
    function submit() {
        if(self.user.id===null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        }else{
            updateUser(self.user);
            console.log('User updated with id ', self.user.id);
        }
        reset();
    }
//
    function edit(user){
        console.log('id to be edited', user.id);
        self.user = angular.copy(user);
        console.log(self.user);

    }

    function remove(user){
        console.log('id to be deleted', user.id);
        if(self.user.id === user.id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteUser(user);
    }
    
    function reset(){
        self.user={id:null,username:'',password:''};
        $scope.myForm.$setPristine(); //reset Form
    }

}]);

'use strict';

app.controller('UserController', ['$scope', '$http', function($scope, $http) { 
    
    var self = this;
    self.user={id:null,username:'',password:''};
    self.users=[];

    self.submit = submit;
//    self.edit = edit;
//    self.remove = remove;
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
            'Content-Type': 'application/json'
             
         },
         data: JSON.stringify(user),
         dataType: 'json',
        }

        $http(req).then(function(){console.log("CC")}, function(){console.log("CCC")});

    }
//
//    function updateUser(user, id){
//        UserService.updateUser(user, id)
//            .then(
//            fetchAllUsers,
//            function(errResponse){
//                console.error('Error while updating User');
//            }
//        );
//    }
//
//    function deleteUser(id){
//        UserService.deleteUser(id)
//            .then(
//            fetchAllUsers,
//            function(errResponse){
//                console.error('Error while deleting User');
//            }
//        );
//    }
//
    function submit() {
        if(self.user.id===null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        }else{
            updateUser(self.user, self.user.id);
            console.log('User updated with id ', self.user.id);
        }
        reset();
    }
//
//    function edit(id){
//        console.log('id to be edited', id);
//        for(var i = 0; i < self.users.length; i++){
//            if(self.users[i].id === id) {
//                self.user = angular.copy(self.users[i]);
//                break;
//            }
//        }
//    }
//
//    function remove(id){
//        console.log('id to be deleted', id);
//        if(self.user.id === id) {//clean form if the user to be deleted is shown there.
//            reset();
//        }
//        deleteUser(id);
//    }
//
//
    function reset(){
        self.user={id:null,username:'',password:''};
        $scope.myForm.$setPristine(); //reset Form
    }

}]);

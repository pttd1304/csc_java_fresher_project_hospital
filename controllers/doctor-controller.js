'use strict';

app.controller('DoctorController', ['$scope', '$http', function($scope, $http) { 
    
    var self = this;
    self.person={id:null,fullname:'',address:'', dob:'', sex:'',cmnd:'',role:'',job:'',treatmentId:''};
    self.persons=[];

    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    

    function fetchAllPersons(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/api/persons').then(function(response){
            $scope.persons= response.data;
            
        }, function(error){
            console.log("a");
        });
    }
    fetchAllPersons();
    
    function createPerson(person){
        var req = {
         method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/api/persons',
         headers: {         
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
             
         },
         data: JSON.stringify(person),
         dataType: 'json',
        }

        $http(req).then(fetchAllPersons, function(){console.log("CCC")});

    }
    function updatePerson(person){
         var req = {
         method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/api/persons' + person.id,
         headers: {         
            'Accept': 'application/json',
            'Content-Type': 'application/json'
             
         },
         data: JSON.stringify(person),
         dataType: 'json',
        }
        console.log("Update...")
        $http(req).then(fetchAllPatients, function(){console.log("CCC")});
    }


    function deletePerson(person){
        console.log("Yo");
        var req = {
         method: 'DELETE',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/api/persons/' + person.id,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'   
         },
         data: JSON.stringify(person),
         dataType: 'json',
        }
        $http(req).then(fetchAllPersons, function(){console.log("CCC")});
    }
//
    function submit(person) {
        if(self.person.id===null){
            console.log('Saving New User', self.person);
            createPerson(self.person);
        }else{
            updatePerson(self.person);
            console.log('User updated with id ', self.person.id);
        }
        reset();
    }
//
    function edit(person){
        console.log('id to be edited', person.id);
        self.person = angular.copy(person);
        console.log(self.person);

    }

    function remove(person){
        console.log('id to be deleted', person.id);
        if(self.person.id === person.id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deletePerson(person);
    }
    
    function reset(){
        self.person={id:null,fullname:'',address:'', dob:'', sex:'',cmnd:'',role:'',job:'',treatmentId:''};
        $scope.myForm.$setPristine(); //reset Form
    }

}]);

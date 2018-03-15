'use strict';
app.controller('AdminController', ['$scope', '$http',  function($scope, $http) { 
    
    var self = this;
    
    self.user={id:null, username: '', password:'', role:'', cmnd: ''};
    self.users=[];
    
    self.person={id:null,fullname:'',address:'', dob:'', sex:'',cmnd:''};
    self.persons=[];
    
    self.treatment={id:null, prescription:'', medicalResult:'', medicine:'', diseases:'', personId:''};
    self.treatments=[];
    
    self.medicine={id:null, name:'',nsx:'', exp:'', company:''};
    self.medicines=[];
    
    self.allergy={id:null, personId:'', medicine:''};
    self.allergies=[];
    
    self.log={id:null, timeModified: "", doctorId: "", doctorName: "", changes: ""};
    self.logs=[];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    self.view = view;

    function fetchAllPersons(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/persons').then(function(response){
            self.persons= response.data;
        }, function(){
            
        });
    }
    fetchAllPersons();
    
    
    function fetchAllTreatments(){ 
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/treatments/').then(function(response){
            self.treatments = response.data;
        }, function(){
            
        });
    }
    
    
    function fetchAllTreatmentsById(id){ 
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/treatments/'+id).then(function(response){
            $scope.treatmentsById = response.data;
            console.log($scope.treatmentsById);
        }, function(){
            
        });
    }
    
    function fetchAllAllergiesById(id){ 
     console.log(id);
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/allergies/'+id).then(function(response){
            $scope.allergiesById = response.data[0];
            console.log(response.data[0]);
        }, function(){
            
        });
    }
    
    
    function fetchAllUsers(){ //Dang xai rootscope
        $http.get('http://localhost:8080/DemoSpringMVCHibernate/users').then(function(response){
        self.users = response.data; 

        }, function(){
        });
    }
    fetchAllUsers();
    
    
    function fetchAllMedicines(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/medicines').then(function(response){
            self.medicines = response.data;
            
        }, function(){
            
        });
    }
    fetchAllMedicines();
    
    function fetchAllLogs(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/logs').then(function(response){
            self.logs = response.data;
            
        }, function(){
            
        });
    }
    fetchAllLogs();
    
    function create(choice, value){
        switch(choice){
            case 1: //user        
                var req = {
                 method: 'POST',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/users',
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(function(){
                                fetchAllUsers()
                }, function(){console.log("CCC")});
                break;
            case 2: //medicine
                var req = {
                 method: 'POST',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/medicines',
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'

                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(
                    function(){
                        fetchAllMedicines()
                    }
                    , function(){console.log("CCC")});
                break;
            case 3: //patient profiles
                var req = {
                 method: 'POST',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/persons',
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'

                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(
                    function(){
                        fetchAllPersons()
                    }, 
                    function(){console.log("CCC")});
                break;
            case 4: //patient profiles
                var req = {
                 method: 'POST',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/treatments',
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'

                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(
                    function(){
                        fetchAllTreatmentsById(value.personId)
                    }
                     
                    , function(){console.log("CCC")});
                break;
            case 5: //allergies
                var req = {
                 method: 'POST',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/allergies',
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(
                    function(){
                        fetchAllAllergiesById(value.id)
                    }          
                    , function(){console.log("CCC")});
                break;
            default:
                break;
        }
        
    }
    
    function update(choice, value){
        switch (choice){
            case 1: //User
                 var req = {
                 method: 'PUT',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/users/' + value.id,
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                console.log("Update...")
                $http(req).then(fetchAllUsers, function(){console.log("CCC")});
                break;
            case 2:
                var req = {
                 method: 'PUT',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/medicines/' + value.id,
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                console.log("Update...")
                $http(req).then(fetchAllMedicines, function(){console.log("CCC")});
                break;
            case 3:
                var req = {
                 method: 'PUT',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/persons/' + value.id,
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                console.log("Update...")
                $http(req).then(fetchAllPersons, function(){console.log("CCC")});
                break;
            case 4:
                var req = {
                 method: 'PUT',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/treatments/' + value.id,
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                console.log("Update...")
                $http(req).then(function(){
                        fetchAllTreatmentsById(value.personId)
                    }, function(){console.log("CCC")});
                break;
            case 5:
                var req = {
                 method: 'PUT',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/allergies/' + value.id,
                 headers: {         
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                console.log("Update...")
                $http(req).then(function(){
                        fetchAllAllergiesById(value.personId)
                    }, function(){console.log("CCC")});
                break;              
            default:
                break;
        }
        
    }
    
    
    function deleteSomething(choice, value){
        switch (choice){
            case 1: //user
                var req = {
                 method: 'DELETE',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/users/' + value.id,
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'   
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(
                    function(){
                        fetchAllUsers()
                    }
                    , function(){console.log("CCC")});
                break;
            case 2: //medicine
                var req = {
                 method: 'DELETE',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/medicines/' + value.id,
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'   
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(fetchAllMedicines, function(){console.log("CCC")});
                break;
            case 3: //patient profiles
                var req = {
                 method: 'DELETE',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/persons/' + value.id,
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'   
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(function(){
                    fetchAllPersons()
                }, function(){console.log("CCC")});
                break;
            case 4:
                 var req = {
                 method: 'DELETE',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/treatments/' + value.id,
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'   
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(function(){
                        fetchAllTreatmentsById(value.personId)
                    }, function(){console.log("CCC")});
                break;
            case 5:
                 var req = {
                 method: 'DELETE',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/allergies/' + value.id,
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'   
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(function(){
                        fetchAllAllergiesById(value.personId)
                    }, function(){console.log("CCC")});
                break;
            case 6:
                var req = {
                 method: 'DELETE',
                 url: 'http://localhost:8080/DemoSpringMVCHibernate/logs/' + value.id,
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'   
                 },
                 data: JSON.stringify(value),
                 dataType: 'json',
                }
                $http(req).then(function(){
                        fetchAllLogs()
                    }, function(){console.log("CCC")});
                break;
            default:
                break;
        }
        console.log("Yo");
        
    }
    
    function submit(choice) {
        switch(choice){
            case 1:    //user
                if(self.user.id===null){
                    console.log('Saving New User', self.user);
                    create(1, self.user);
                }else{
                    update(1, self.user);
                    console.log('User updated with id ', self.user.id);
                }
                reset(1); 
                break;
            case 2: //medicine
                if(self.medicine.id===null){
                    console.log('Saving New Medicine', self.medicine);
                    create(2, self.medicine);
                }else{
                    update(2, self.medicine);
                    console.log('Medicine updated with id ', self.medicine.id);
                }
                reset(2); 
                break;
            case 3: //patient profiles    
                if(self.person.id===null){
                    console.log('Saving New User', self.person);
                    create(3, self.person);
                }else{
                    update(3, self.person);
                    console.log('Patient profile updated with id ', self.person.id);
                }
                reset(3); 
                break;
            case 4:
                if(self.treatment.id===null){
                    self.treatment.personId = self.person.id;
                    console.log('Saving New Treatment', self.treatment);
                    create(4, self.treatment);
                }else{
                    update(4, self.treatment);
                    console.log('Treatment updated with id ', self.treatment.id);
                }
                reset(4); 
                break;
            case 5:
                if(self.allergy.id===null){
                    self.allergy.personId = self.person.id;
                    console.log('Saving New Allergy', self.allergy);
                    create(5, self.allergy);
                }else{
                    update(5, self.allergy);
                    console.log('Allergy updated with id ', self.allergy.id);
                }
                reset(4); 
                break;
            default:
                break;
        }
                
    }
    
    function view(person){
        self.person = angular.copy(person);
        fetchAllTreatmentsById(person.id);
        fetchAllAllergiesById(person.id);
    }

    function edit(choice, value){
        switch (choice){
            case 1: //User
                console.log('User id to be edited', value.id);
                self.user = angular.copy(value);
                break;
            case 2: //Medicine
                console.log('Medicine id to be edited', value.id);
                self.medicine = angular.copy(value);
                break;
            case 3: //Patient profile
                console.log('Patient profile id to be edited', value.id);
                self.person = angular.copy(value);
                break;
            case 4: //Treatment profile
                console.log('Treatment id to be edited', value.id);
                self.treatment = angular.copy(value);
                break;
            case 5: //Allergy
                $scope.addAllergy = !$scope.addAllergy;
                console.log('Allergy id to be edited', value.id);
                self.allergy = angular.copy(value);
                break;
            default:
                break;
        }
    }
    
    function remove(choice, value){       
        switch(choice){
            case 1:    //user
                console.log('User id to be deleted', value.id);
                if(self.user.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset(1);
                }
                deleteSomething(1, value);
                break;
            case 2: //medicine
                console.log('Medicine id to be deleted', value.id);
                if(self.medicine.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset(2);
                }
                deleteSomething(2, value);
                break;
            case 3: //patient profiles
                console.log('Patient profile id to be deleted', value.id);
                if(self.person.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset(3);
                }
                deleteSomething(3, value);
                break;
            case 4:
                console.log('Treatment id to be deleted', value.id);
                if(self.treatment.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset(4);
                }
                deleteSomething(4, value);
                break;
            case 5:
                console.log('Allergy id to be deleted', value.id);
                if(self.allergy.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset(5);
                }
                deleteSomething(5, value);
                break;
            case 6:
                console.log('Log id to be deleted', value.id);
                if(self.log.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset(6);
                }
                deleteSomething(6, value);
                break;
            default:
                break;
        }
    }
    
    function reset(choice){
        switch (choice){
            case 1: //user
                self.user={id:null, username: '', password:'', role:'', cmnd: ''};     
                break;
            case 2: //medicine
                self.medicine = {id:null, name:'',nsx:'', exp:'', company:''}
                break;
            case 3: //patients profile
                self.person={id:null,fullname:'',address:'', dob:'', sex:'',cmnd:''};
                break;
            case 4: //treatment
                self.treatment={id:null, prescription:'', medicalResult:'', medicine:'', diseases:'', personId:''};
                break;
            case 5: //allergy
                self.allergy={id:null, personId:'', medicine:''};
                break;
            case 6:
                self.log={id:null, timeModified: "", doctorId: "", doctorName: "", changes: ""};
                break;
            default:
                break;
        } 
        $scope.ctrl.myForm.$setPristine();
       
    }
    
}]);

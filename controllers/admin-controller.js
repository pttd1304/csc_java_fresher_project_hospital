
app.controller('AdminController', ['$scope', '$http', function($scope, $http, detail) { 
    
    var self = this;
    
    self.user={id:null, username: '', password:'', role:'', cmnd: ''};
    self.users=[];
    
    self.person={id:null,fullname:'',address:'', dob:'', sex:'',treatments:[],cmnd:''};
    self.persons=[];
    
    self.treatment={id:null, prescription:'', result:'', doctorId:'', diseases:''};
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
    self.add = add;
//    $scope.treatments = detail.getDetail();

    
    function add(){
        $scope.addTreatment = !$scope.addTreatment;
    }
    
   

    function fetchAllPersons(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/persons').then(function(response){
            $scope.persons= response.data;
            
        }, function(error){
            console.log("a");
        });
    }
    
    fetchAllPersons();
    
    
//    function fetchAllTreatmentsById(id){
//     console.log("a"); 
//     $http.get('http://localhost:8080/DemoSpringMVCHibernate/treatments/'+id).then(function(response){
//            
//            console.log(detail.getData);
//        }, function(error){
//            
//        });
//    }
        
    function fetchAllUsers(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/users').then(function(response){
            $scope.users = response.data;
            
        }, function(error){
            console.log("a");
        });
    }
    
    fetchAllUsers();
    
    $scope.addDetailToList = function(person){
        detail.addDetail(person);
    }
    
    function viewDetail(person){
        console.log("a");
    }
    
    function fetchAllMedicines(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/medicines').then(function(response){
            $scope.medicines = response.data;
            
        }, function(error){
            console.log("a");
        });
    }
    fetchAllMedicines();
    
    function fetchAllLogs(){
     $http.get('http://localhost:8080/DemoSpringMVCHibernate/logs').then(function(response){
            $scope.logs = response.data;
            
        }, function(error){
            console.log("a");
        });
    }
    fetchAllLogs();

    
    function create(choice, value){
        switch(choice){
            case 1: //user
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
                $http(req).then(fetchAllUsers, function(){console.log("CCC")});
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
                $http(req).then(fetchAllMedicines, function(){console.log("CCC")});
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
                $http(req).then(fetchAllPersons, function(){console.log("CCC")});
                break;
            case 4:
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
                $http(req).then(fetchAllTreatments, function(){console.log("CCC")});
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
                $http(req).then(fetchAllTreatments, function(){console.log("CCC")});
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
                $http(req).then(fetchAllUsers, function(){console.log("CCC")});
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
                $http(req).then(fetchAllPersons, function(){console.log("CCC")});
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
                $http(req).then(fetchAllTreatmentsById(self.person.id), function(){console.log("CCC")});
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
                reset(); 
                break;
            case 2: //medicine
                if(self.medicine.id===null){
                    console.log('Saving New Medicine', self.medicine);
                    create(2, self.medicine);
                }else{
                    update(2, self.medicine);
                    console.log('Medicine updated with id ', self.medicine.id);
                }
                reset(); 
                break;
            case 3: //patient profiles    
                if(self.person.id===null){
                    console.log('Saving New User', self.person);
                    create(3, self.person);
                }else{
                    update(3, self.person);
                    console.log('Patient profile updated with id ', self.person.id);
                }
                reset(); 
                break;
            case 4:
                if(self.treatment.id===null){
                    console.log('Saving New Treatment', self.treatment);
                    create(4, self.treatment);
                }else{
                    update(4, self.treatment);
                    console.log('Treatment updated with id ', self.treatment.id);
                }
                reset(); 
                break;
            default:
                break;
        }
                
    }
//
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
            case 4: //Treatment
                 self.treatment = angular.copy(value);
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
                    reset();
                }
                deleteSomething(1, value);
                break;
            case 2: //medicine
                console.log('Medicine id to be deleted', value.id);
                if(self.medicine.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset();
                }
                deleteSomething(2, value);
                break;
            case 3: //patient profiles
                console.log('Patient profile id to be deleted', value.id);
                if(self.person.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset();
                }
                deleteSomething(3, value);
                break;
            case 4:
                console.log('Treatment id to be deleted', value.id);
                if(self.treatment.id === value.id) {//clean form if the user to be deleted is shown there.
                    reset();
                }
                deleteSomething(4, value);
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
                self.person={id:null,fullname:'',address:'', dob:'', sex:'',cmnd:'',role:'',job:'',treatmentId:''};
                break;
            default:
                break;
        }
        
        $scope.myForm.$setPristine(); //reset Form
    }

}]);

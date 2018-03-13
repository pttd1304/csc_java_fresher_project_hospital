'use strict';

app.controller('LogController', ['$scope', '$http', function($scope, $http) { 
    
    var self = this;
    self.log={id:null,timeModified:'',doctorId:'', doctorName:'', changes:''};
    self.logs=[];

    self.submit = submit;
    self.removeLog = removeLog;
    self.reset = reset;
    
    function fetchAllLogs(){
        $http.get('http://localhost:8080/DemoSpringMVCHibernate/api/logs').then(function(response){
            $scope.logs= response.data;
            console.log(response.data);
            
        }, function(error){
            console.log("Log fail");
        });
    }
    fetchAllLogs();
    
    
    function createLogs(log){
        
        var req = {
         method: 'POST',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/api/logs',
         headers: {         
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
             
         },
         data: JSON.stringify(log),
         dataType: 'json',
        }

        $http(req).then(fetchAllLogs, function(){console.log("Log fail")});

    }
     
    function deleteLog(log){
        var req = {
         method: 'DELETE',
         url: 'http://localhost:8080/DemoSpringMVCHibernate/api/logs/' + log.id,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'   
         },
         data: JSON.stringify(log),
         dataType: 'json',
        }
        $http(req).then(fetchAllLogs, function(){console.log("CCC")});
    }
//
    function submit(log) {
        if(self.log.id===null){
            console.log('Saving log', self.log);
            createLog(self.log);
        }else{
            updateLog(self.log);
            console.log('Log updated with id ', self.log.id);
        }
        reset();
    }
//


//    function remove(person){
//        console.log('id to be deleted', person.id);
//        if(self.person.id === person.id) {//clean form if the user to be deleted is shown there.
//            reset();
//        }
//        deletePerson(person);
//    }
    function removeLog(log){
        console.log('id to be deleted', log.id);
        if(self.log.id === log.id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteLog(log);
    }
    
    function reset(){
        self.person={id:null,timeModified:'',doctorId:'', doctorName:'', changes:''};
        $scope.myForm.$setPristine(); //reset Form
    }

}]);

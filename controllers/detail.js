/*global angular*/
angular.module("detail", []).factory("detail", function(){
    var patientDetail = [];
    
    return{
        addDetail: function(person){
            patientDetail.push(person);
        },
        getDetail: function(){
            return patientDetail;
        }
    }
});
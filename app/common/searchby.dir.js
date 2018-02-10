/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:function(elem,attrs){
          
if(attrs.type==="SM"){
    return './app/common/search.sm.html';
}if(attrs.type==="LG"){
    return './app/common/searchby.lg.html';
}
           
        },
        controllerAs:'$ctrl',
        scope:{
           
         getFields:"&",
         type:"@",
         fields:"=",
         partnerPre:"="
        },
        
        controller: "serachByController"
        }
    }
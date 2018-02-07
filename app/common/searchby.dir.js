/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:function(elem,attrs){
          
if(attrs.type==="SM"){
    return './app/common/search.md.html';
}if(attrs.type==="LG"){
    return './app/common/searchby.dir.html';
}
           
        },
        controllerAs:'$ctrl',
        scope:{
           
         getFields:"&",
         type:"@"
        },
        
        controller: "serachByController"
        }
    }
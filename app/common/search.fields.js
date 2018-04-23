/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'app/common/search.fields.html',
        controllerAs:'ctrl',
        scope:{
           
         getFields:"&",
         loadType:"="
        
        },
        
        controller: "serachFieldsControllerDir"
        };
    };
/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'app/common/noti-action.html',
        controllerAs:'$ctrl',
        scope:{
            data:"=",
            whoSent:"="
           

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.noti=$scope.data;
                controller.whoSent=$scope.whoSent;
                

            }]
        };
    };
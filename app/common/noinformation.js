/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'app/common/noinformation.html',
        controllerAs:'$ctrl',
        scope:{
           type:"@"
        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.$watch('type', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    
                    controller.type = newVal;
                });
                

            }]
        };
    };
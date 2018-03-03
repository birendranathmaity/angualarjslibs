/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/common/notification-text.html',
        controllerAs:'$ctrl',
        scope:{
            notification:"=",
            whoSent:"=",
            section:"="

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.$watch('notification', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    controller.notification=$scope.notification;
                    controller.whoSent=$scope.whoSent;
                    controller.section=$scope.section;
                });
              
            }]
        }
    }
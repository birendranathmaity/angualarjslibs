/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/common/user-img.html',
        controllerAs:'$ctrl',
        scope:{
            isNoti:"=",
            user:"="

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.isNoti=$scope.isNoti;
                controller.pic=$scope.user.pic;
               controller.user=$scope.user;

            }]
        }
    }
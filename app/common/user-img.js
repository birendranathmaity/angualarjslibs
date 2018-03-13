/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'app/common/user-img.html',
        controllerAs:'$ctrl',
        scope:{
            isNoti:"@",
            user:"="

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.$watch('user', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    controller.user=$scope.user;
                    controller.isNoti=$scope.isNoti;
                    controller.pic=controller.user.pic;
                });
               
             }]
        };
    };
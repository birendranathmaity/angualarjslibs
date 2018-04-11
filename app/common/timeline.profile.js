/* @ngInject */
module.exports = function (loginservice) {
    return {
        restrict: 'E',
        templateUrl:'app/common/timeline.profile.html',
        controllerAs:'$ctrl',
        scope:{
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
                    controller.formdata = loginservice.getFiledsData();
                    controller.user=$scope.user;
                    controller.casteData=loginservice.getCastes(controller.user.religion);
                });
                



            }]
        };
    };
/* @ngInject */
module.exports = function (loginservice,$rootScope) {
    return {
        restrict: 'E',
        templateUrl:'app/common/fullprofile.basic.info.html',
        controllerAs:'$ctrl',
        scope:{
            user:"=",
            viewType:"@"
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
                  
                    controller.viewType = $scope.viewType;
                    var isAuthenticated = loginservice.isAuthenticated();
                    if (!isAuthenticated.isAuth){
                        controller.user_action = true;
                    }else{
                        controller.user_action = $rootScope.user_action;
                    }
                });
                



            }]
        };
    };
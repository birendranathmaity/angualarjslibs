/* @ngInject */
module.exports = function ($rootScope,loginservice,$crypto,$state) {
    return {
        restrict: 'E',
        scope:{
          user:"="
        },
        templateUrl:'app/matches/components/profile-view.html',
        controllerAs:'$ctrl',
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
                    controller.user_action=$rootScope.user_action;
                    controller.user=$scope.user;
                    controller.formdata = loginservice.getFiledsData();
                    controller.casteData=loginservice.getCastes(controller.user.religion);
                   
                });
                controller.goToFullProfile=function(id){
                   
                    $state.go("root.fullprofile",{
                        id: $crypto.encrypt(id),
                        isblock:controller.user.is_blocked_profile
                    });
                  };
             }
        ]
    };
};

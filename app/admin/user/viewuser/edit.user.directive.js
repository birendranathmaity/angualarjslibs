/* @ngInject */
module.exports = function ($http) {
    return {
        restrict: 'EA',
        scope:{
             viewType:"="
        },
        templateUrl: 'app/admin/user/viewuser/edit.user.html',
        controller: 'editUserDirCtrl',
        controllerAs:'ctrl',
        link:function($scope, $element, $attrs){




        }
    };
};
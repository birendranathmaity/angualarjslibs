/* @ngInject */
module.exports = function ($http) {
    return {
        restrict: 'EA',
        scope:{
             viewType:"="
        },
        templateUrl: './app/admin/user/viewuser/viewUserDir.html',
        controller: 'viewUserDirCtrl',
        controllerAs:'ctrl',
        link:function($scope, $element, $attrs){




        }
    };
};
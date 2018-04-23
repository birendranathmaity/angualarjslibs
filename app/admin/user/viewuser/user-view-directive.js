/* @ngInject */
module.exports = function () {
    return {
        restrict: 'EA',
        scope:{
            fields:"="
        },
        templateUrl: 'app/admin/user/viewuser/viewUserDir.html',
        controller: 'viewUserDirCtrl',
        controllerAs:'ctrl',
        link:function($scope, $element, $attrs){




        }
    };
};
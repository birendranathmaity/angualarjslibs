/* @ngInject */
module.exports = function () {
    return {
        restrict: 'EA',
        scope:{
             viewType:"="
        },
        templateUrl: './app/messages/components/messages.view.directive.html',
        controller: 'messagesViewDirCtrl',
        controllerAs:'$ctrl',
        link:function($scope, $element, $attrs){




        }
    };
};
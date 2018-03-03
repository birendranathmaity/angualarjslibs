var angular = require('angular');
var routes = require('./layout.route.js');
var layoutcomponents = require('./components');
var HeaderController = require('./header.controller');
var SidebarController = require('./sidebar.controller');

module.exports = angular.module('app.ui.layouts', [layoutcomponents.name])
    .run(routes)
    .controller('HeaderController', HeaderController)
    .controller('SidebarController', SidebarController)
    .directive('relinkEvent', function($rootScope) {
    return {
        transclude: 'element',
        restrict: 'A',
        link: function(scope, element, attr, ctrl, transclude) {
            var previousContent = null;
            
            var triggerRelink = function() {
                if (previousContent) {
                    previousContent.remove();
                    previousContent = null;
                }
                
                transclude(function (clone) {
                    console.log('relinking');
                    element.parent().append(clone);
                    previousContent = clone;
                });
                
            };
            
            triggerRelink();                
            scope.$on(attr.relinkEvent, triggerRelink);

        }
    };

});
var angular = require('angular');
var headerNotificationsMsg = require('./headerNotificationsMsg.directive');
var langSelect = require('./language.dropdown');
var waterMark = require('./watermark.photo');
var headerNotiController = require('./header_noti_controller');
var dateParse = require('./dateParse');
module.exports = angular.module('app.ui.headercomponents',[])
   .directive('headerNotificationsMsg', headerNotificationsMsg)
   .directive('dateParse', dateParse)
   .directive('langSelect', langSelect)
   .controller('headerNotiController', headerNotiController)
   .directive('waterMark', waterMark)
   .directive('pkAudio', function () {
    return {
        restrict: 'A',
        scope: {
            pkAudio: '='
        },
        link: function (scope, element, attrs, ngModelCtrl) {

            var removeBehaviorsRestrictions = function() {
                element.load();
                window.removeEventListener('keydown', removeBehaviorsRestrictions);
                window.removeEventListener('mousedown', removeBehaviorsRestrictions);
                window.removeEventListener('touchstart', removeBehaviorsRestrictions);
            };
            window.addEventListener('keydown', removeBehaviorsRestrictions);
            window.addEventListener('mousedown', removeBehaviorsRestrictions);
            window.addEventListener('touchstart', removeBehaviorsRestrictions);

            scope.pkAudio = element[0];
        }
    };
})
 
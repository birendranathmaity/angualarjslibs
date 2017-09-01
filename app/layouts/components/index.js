var angular = require('angular');
var headerNotificationsMsg = require('./headerNotificationsMsg.directive');
var langSelect = require('./language.dropdown');

module.exports = angular.module('app.ui.headercomponents',[])
   .directive('headerNotificationsMsg', headerNotificationsMsg)
   .directive('langSelect', langSelect);

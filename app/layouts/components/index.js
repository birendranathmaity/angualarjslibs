var angular = require('angular');
var headerNotificationsMsg = require('./headerNotificationsMsg.directive');
var langSelect = require('./language.dropdown');
var waterMark = require('./watermark.photo');
var headerNotiController = require('./header_noti_controller');
module.exports = angular.module('app.ui.headercomponents',[])
   .directive('headerNotificationsMsg', headerNotificationsMsg)
   .directive('langSelect', langSelect)
   .controller('headerNotiController', headerNotiController)
   .directive('waterMark', waterMark);
 
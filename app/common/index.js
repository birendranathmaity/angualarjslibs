'use strict';
var angular = require('angular');
var routes = require('./common.routes');
//services//
var userAction=require('./user.actions.service');
var notificationText=require('./notification-text');
var userImg=require('./user-img');
var notiAction=require('./noti-action');
var searchBy=require('./searchby.dir.js');
var AccountSettingsController = require('./settings/settings.ctrl');
var notificationController = require('./notifications/notifications.ctrl');
var fullprofileController = require('./fullprofile/fullprofile.ctrl');
var serachByController = require('./serachby.dir.ctrl');
var noinformation = require('./noinformation');
module.exports = angular.module('app.ui.common', [])
.run(routes)
.directive('notificationText', notificationText)
.directive('userImg', userImg)
.directive('notiAction', notiAction)
.directive('searchBy', searchBy)
.directive('noinformation', noinformation)
.controller('AccountSettingsController', AccountSettingsController)
.controller('notificationController', notificationController)  
.controller('fullprofileController', fullprofileController) 
.controller('serachByControllerDir', serachByController) 
.factory("useractions",userAction);

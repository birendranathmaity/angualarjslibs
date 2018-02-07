'use strict';
var angular = require('angular');
var routes = require('./common.routes');
//services//
var userAction=require('./user.actions.service');
var notificationText=require('./notification-text');
var userImg=require('./user-img');
var notiAction=require('./noti-action');
var searchBy=require('./searchby.dir.js');
var notificationController = require('./notifications/notifications.ctrl');
var serachByController = require('./serachby.dir.ctrl');
module.exports = angular.module('app.ui.common', [])
.run(routes)
.directive('notificationText', notificationText)
.directive('userImg', userImg)
.directive('notiAction', notiAction)
.directive('searchBy', searchBy)
.controller('notificationController', notificationController) 
.controller('serachByController', serachByController) 
.factory("useractions",userAction);

'use strict';
var angular = require('angular');
var routes = require('./common.routes');
//services//
var userAction=require('./user.actions.service');
var notificationText=require('./notification-text');
var userImg=require('./user-img');
var notiAction=require('./noti-action');
var notificationController = require('./notifications/notifications.ctrl');
module.exports = angular.module('app.ui.common', [])
.run(routes)
.directive('notificationText', notificationText)
.directive('userImg', userImg)
.directive('notiAction', notiAction)
.controller('notificationController', notificationController) 
.factory("useractions",userAction);

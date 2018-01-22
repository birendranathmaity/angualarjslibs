'use strict';
var angular = require('angular');
var routes = require('./common.routes');
//services//
var userAction=require('./user.actions.service');
var notificationController = require('./notifications/notifications.ctrl');
module.exports = angular.module('app.ui.common', [])
.run(routes)
.controller('notificationController', notificationController) 
.factory("useractions",userAction);

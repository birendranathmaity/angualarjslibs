'use strict';
var angular = require('angular');
var adminroutes = require('./admin.route');
var adminDashboardController = require('./home/dashboard/dashboard.ctrl');
var addUserController = require('./user/adduser/addUser.ctrl');
var viewUserController = require('./user/viewuser/viewUser.ctrl');
module.exports = angular.module('app.ui.admin', [])
    .run(adminroutes)
    .controller('adminDashboardController', adminDashboardController)
    .controller('addUserController', addUserController)
    .controller('viewUserController', viewUserController);
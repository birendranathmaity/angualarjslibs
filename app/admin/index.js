'use strict';
var angular = require('angular');
var adminroutes = require('./admin.route');
var adminDashboardController = require('./home/dashboard/dashboard.ctrl');
var addUserController = require('./user/adduser/addUser.ctrl');
var viewUserController = require('./user/viewuser/viewUser.ctrl');
var adminServices = require('./services');
module.exports = angular.module('app.ui.admin', [adminServices.name])
    .run(adminroutes)
    .controller('adminDashboardController', adminDashboardController)
    .controller('addUserController', addUserController)
    .controller('viewUserController', viewUserController);
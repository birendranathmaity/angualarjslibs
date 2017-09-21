'use strict';
var angular = require('angular');
var adminroutes = require('./admin.route');
var adminDashboardController = require('./home/dashboard/dashboard.ctrl');
var addUserController = require('./user/adduser/addUser.ctrl');
var viewUserController = require('./user/viewuser/viewUser.ctrl');
var rejectController = require('./reject-modal/reject.ctrl');
var adminServices = require('./services');
var viewUserDirCtrl = require('./user/viewuser/viewUserDir.ctrl');
var userViewDirective = require('./user/viewuser/user-view-directive');
var editUserDir = require('./user/viewuser/edit.user.directive');
var editUserDirCtrl = require('./user/viewuser/edit.user.ctrl');
module.exports = angular.module('app.ui.admin', [adminServices.name])
    .run(adminroutes)
    .controller('adminDashboardController', adminDashboardController)
    .controller('addUserController', addUserController)
    .controller('viewUserController', viewUserController)
    .controller('rejectController', rejectController)
    .controller('viewUserDirCtrl', viewUserDirCtrl)
    .directive('userViewDirective', userViewDirective)
    .controller('editUserDirCtrl', editUserDirCtrl)
    .directive('editUserDirective', editUserDir);
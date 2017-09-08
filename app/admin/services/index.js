'use strict';
var angular = require('angular');
var viewUsers=require('./view.users.service');
var admintaskservice=require('./admin.task.service');
module.exports = angular.module('app.ui.admin.services', [])
.factory("$viewusers",viewUsers)
.factory("$admintaskservice",admintaskservice);;

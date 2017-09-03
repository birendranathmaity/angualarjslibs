'use strict';
var angular = require('angular');
var viewUsers=require('./view.users.service');
module.exports = angular.module('app.ui.admin.services', [])
.factory("$viewusers",viewUsers);

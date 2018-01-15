'use strict';
var angular = require('angular');

//services//
var userAction=require('./user.actions.service');

module.exports = angular.module('app.ui.common', [])

.factory("useractions",userAction);

'use strict';

var angular = require('angular');

var landingModule = require('./landing');
//var loginService = require('./../http-service/login/login.service');
module.exports = angular.module('app.ui.public', [ landingModule.name]);

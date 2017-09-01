'use strict';
var angular = require('angular');

//services//
var login=require('./login.service');
var countryService=require('./country.service');
module.exports = angular.module('app.ui.registration.login.services', [])
.factory("loginservice",login)
.factory("countryService",countryService);
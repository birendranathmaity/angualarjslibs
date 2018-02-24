'use strict';
var angular = require('angular');

//services//
var login=require('./login.service');
var countryService=require('./country.service');
//var toaster=require('./toaster.config');
module.exports = angular.module('app.ui.registration.login.services', [])
//.config(toaster)
.factory("loginservice",login)
.factory("countryService",countryService);
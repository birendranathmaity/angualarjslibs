var angular = require('angular');
var ngResource = require('angular-resource');

var PatientResource = require('./patient.resource');

module.exports = angular.module('app.ui.resource', [ngResource])
    .factory('PatientResource', PatientResource);
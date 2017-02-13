var angular = require('angular');

var PatientService = require('./patient.service');

module.exports = angular.module('app.ui.service', [])
    .factory('PatientService', PatientService);
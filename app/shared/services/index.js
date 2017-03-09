var angular = require('angular');

var PatientService = require('./patient.service');
var GraphService = require('./graph.service');


module.exports = angular.module('app.ui.service', [])
    .factory('PatientService', PatientService)
    .factory('GraphService', GraphService);
'use strict';

var angular = require('angular');
var routes = require('./patient.route');

var PatientDashboardController = require('./dashboard/patientDashboard.controller');

module.exports = angular.module('app.ui.patient', [])
    .run(routes)
    .controller('PatientDashboardController', PatientDashboardController);

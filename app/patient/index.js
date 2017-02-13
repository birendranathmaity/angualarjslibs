'use strict';

var angular = require('angular');
var routes = require('./patient.route');

var PatientDashboardController = require('./dashboard/patientDashboard.controller');
var PatientLoginController = require('./login/patientLogin.controller');
var PatientRegistrationController = require('./registration/patientRegistration.controller');

module.exports = angular.module('app.ui.patient', [])
    .run(routes)
    .controller('PatientDashboardController', PatientDashboardController)
    .controller('PatientLoginController', PatientLoginController)
    .controller('PatientRegistrationController', PatientRegistrationController);

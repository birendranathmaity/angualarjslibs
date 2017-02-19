'use strict';

var angular = require('angular');
var routes = require('./patient.route');
//var uiSwitch = require('angular-ui-switch');

var PatientDashboardController = require('./dashboard/patientDashboard.controller');
var PatientRegistrationController = require('./registration/patientRegistration.controller');
var PersonalInfoController = require('./personalInfo/personalInfo.controller');
var PatientInsuranceController = require('./insurance/patientInsurance.controller');
var AddPatientController = require('./addPatient/addPatient.controller');
var AddPatientNetworkController = require('./network/addPatientNetwork.controller');
var PatientNetworkController = require('./network/patientNetwork.controller');


module.exports = angular.module('app.ui.patient', ['uiSwitch'])
    .run(routes)
    .controller('PatientDashboardController', PatientDashboardController)
    .controller('PatientRegistrationController', PatientRegistrationController)
    .controller('PersonalInfoController', PersonalInfoController)
    .controller('PatientInsuranceController', PatientInsuranceController)
    .controller('AddPatientController', AddPatientController)
    .controller('AddPatientNetworkController', AddPatientNetworkController)
    .controller('PatientNetworkController', PatientNetworkController);
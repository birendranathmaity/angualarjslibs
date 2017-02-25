'use strict';

var angular = require('angular');
var routes = require('./patient.route');

var PatientDashboardController = require('./dashboard/patientDashboard.controller');
var PatientRegistrationController = require('./registration/patientRegistration.controller');
var PersonalInfoController = require('./personalInfo/personalInfo.controller');
var PatientInsuranceController = require('./insurance/patientInsurance.controller');
var AddPatientController = require('./addPatient/addPatient.controller');
var AddPatientNetworkController = require('./network/addPatientNetwork.controller');
var PatientNetworkController = require('./network/patientNetwork.controller');
var PatientNotificationController = require('./notifications/patientNotificationController');
var PatientQuestionnaireController = require('./questionnaire/patientQuestionnaire.controller');
var PatientFormsController = require('./forms/patientForms.controller');
var PatientLookupController = require('./lookup/patientLookup.controller');
var PatientReminderController = require('./reminders/patientReminder.controller');

module.exports = angular.module('app.ui.patient', [])
    .run(routes)
    .controller('PatientDashboardController', PatientDashboardController)
    .controller('PatientRegistrationController', PatientRegistrationController)
    .controller('PersonalInfoController', PersonalInfoController)
    .controller('PatientInsuranceController', PatientInsuranceController)
    .controller('AddPatientController', AddPatientController)
    .controller('AddPatientNetworkController', AddPatientNetworkController)
    .controller('PatientNetworkController', PatientNetworkController)
    .controller('PatientNotificationController', PatientNotificationController)
    .controller('PatientQuestionnaireController', PatientQuestionnaireController)
    .controller('PatientFormsController', PatientFormsController)
    .controller('PatientLookupController', PatientLookupController)
    .controller('PatientReminderController', PatientReminderController);
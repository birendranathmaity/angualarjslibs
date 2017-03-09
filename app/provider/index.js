'use strict';

var angular = require('angular');
var routes = require('./provider.route');

var ProviderDashboardController = require('./dashboard/providerDashboard.controller');
var ProviderEmergencyController = require('./emergency/providerEmergency.controller');
var MedicineController = require('./patientCarePlan/medicine/medicine.controller');
var ExerciseController = require('./patientCarePlan/exercise/exercise.controller');
var ExerciseMindfulnessController = require('./patientCarePlan/exercise-mindfulness/exerciseMindfulness.controller');

module.exports = angular.module('app.ui.provider', [])
    .run(routes)
    .controller('ProviderDashboardController', ProviderDashboardController)
    .controller('ProviderEmergencyController', ProviderEmergencyController)
    .controller('MedicineController', MedicineController)
    .controller('ExerciseController', ExerciseController)
    .controller('ExerciseMindfulnessController', ExerciseMindfulnessController);

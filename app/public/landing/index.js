var angular = require('angular');

var landingRoutes = require('./landing.route');
var LandingController = require('./landing.controller');

module.exports = angular.module('app.ui.landing', [])
    .run(landingRoutes)
    .controller('LandingController', LandingController);
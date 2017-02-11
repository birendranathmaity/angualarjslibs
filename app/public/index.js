'use strict';

var angular = require('angular');

var landingModule = require('./landing');

module.exports = angular.module('app.ui.public', [
    landingModule.name
]);

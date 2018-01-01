'use strict';
var angular = require('angular');

//services//
var matches=require('./matches.service');

module.exports = angular.module('app.ui.matches.services', [])

.factory("matcheservice",matches);

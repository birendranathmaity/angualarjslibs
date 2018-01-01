'use strict';
var angular = require('angular');

//services//
var messages=require('./messages.service');

module.exports = angular.module('app.ui.messages.services', [])

.factory("messagesservice",messages);

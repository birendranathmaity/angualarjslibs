var angular = require('angular');
var translate = require('angular-translate');
var translateFiles = require('angular-translate-loader-static-files');

var translateConfig = require('./translate.config');


module.exports = angular.module('app.ui.translate', [translate,translateFiles])
    .provider('translateConfig', translateConfig);
    
var angular = require('angular');
var angularLoadingBar = require('angular-loading-bar');
var loadingConfig = require('./loading.config');
module.exports = angular.module('app.ui.loading', [angularLoadingBar])
    .provider('loadingConfig', loadingConfig);
    
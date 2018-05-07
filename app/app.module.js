// Import angular dependencies
var angular = require('angular');
require('angular-sanitize');
var uiRouter = require('angular-ui-router');
require('ui-router-extras');
var ngAnimate = require('angular-animate');
var moment = window.moment = require('moment');
require('angular-permission');
require('angular-ui-switch');
require('angular-ui-bootstrap');
require('ui-select');
require('angularjs-toaster');
require('ng-scrollbars');
require('ngstorage');
require('ng-file-upload');
require('angular-chart.js');
require('ng-image-gallery');
require('angularjs-slider');
// App UI modules
var LoadingBarModule = require('./loading-bar');
var routerModule = require('./router');
var publicModule = require('./public');
var layoutsModule = require('./layouts');
var translateModule = require('./translate');
var myHomeModule = require('./my-home');
var registrationLoginModule = require('./registration-login');
var adminModule = require('./admin');
var matchesModule = require('./matches');
var messages = require('./messages');
var common = require('./common');
var search = require('./search');
var activites = require('./activites');
//var date = require('./date.config');
angular.module('app.ui', [
    uiRouter,
    'ct.ui.router.extras',
    'permission',
    'permission.ui',
    ngAnimate,
    'ui.bootstrap',
    'ngSanitize',
    'ui.select',
    'toaster',
    'uiSwitch',
    'ngScrollbars',
    'ngStorage',
    'ngFileUpload',
    'chart.js',
    'thatisuday.ng-image-gallery',
    'rzModule',
    LoadingBarModule.name,
    translateModule.name,
    routerModule.name,
    publicModule.name,
    layoutsModule.name,
    common.name,
    myHomeModule.name,
    registrationLoginModule.name,
    adminModule.name,
    matchesModule.name,
    messages.name,
    search.name,
    activites.name


]).config(['$cryptoProvider', function ($cryptoProvider) {
    $cryptoProvider.setCryptographyKey('DHOLBAAJE.COM');
}]).run(function ($rootScope, loginservice, $location) {
    
    var isAuthenticated = loginservice.isAuthenticated();
    if (!isAuthenticated.isAuth && !isAuthenticated.role) {
        loginservice.setRole("GUEST", true); 
     
    }
    if (isAuthenticated.isAuth && isAuthenticated.role) {
        var role = isAuthenticated.role;
        loginservice.setRole(role, isAuthenticated.more_info_vr);
        if (!isAuthenticated.more_info_vr) {
            $location.path("/moreinfo");

        }

    }
    if (isAuthenticated.isAuth && !isAuthenticated.role) {
        loginservice
            .getAuthObject()
            .then(function (user) {
                loginservice.setRole(user.user_role, user.more_info_vr);
                if (!user.more_info_vr) {
                    $location.path("/moreinfo");

                }
            });

    }


}).provider('$crypto', function CryptoKeyProvider() {
    var cryptoKey;

    this.setCryptographyKey = function (value) {
        cryptoKey = value;
    };

    this.$get = [function () {
        return {
            getCryptoKey: function () {
                return cryptoKey;
            },

            encrypt: function (message, key) {

                if (key === undefined) {
                    key = cryptoKey;
                }

                return CryptoJS.AES.encrypt(message, key).toString();
            },

            decrypt: function (message, key) {

                if (key === undefined) {
                    key = cryptoKey;
                }

                return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
            }
        };
    }];
});

//.config(['$provide', date]);
// angular.element(document).ready(function() {
//     angular.bootstrap(document, ['app.ui']);
// });

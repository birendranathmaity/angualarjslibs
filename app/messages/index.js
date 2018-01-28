'use strict';

var angular = require('angular');
var routes = require('./messages.route');
var messagescomponents = require('./components');
var composeMailController = require('./components/compose.mail.controller');
var RequestController = require('./request/Request.controller');
var mailController = require('./mail/mail.controller');
var messagesService = require('./service');
module.exports = angular.module('app.ui.messages', [messagesService.name,messagescomponents.name])
    .run(routes)
    .controller('composeMailController', composeMailController) 
    .controller('RequestController', RequestController) 
    .controller('mailController', mailController);
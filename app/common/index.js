var angular = require('angular');
var routes = require('./common.routes');

var ChatController = require('./chat/chat.controller');

module.exports = angular.module('app.ui.common', [])
    .run(routes)
    .controller('ChatController', ChatController);

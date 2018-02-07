var angular = require('angular');
var profileView = require('./profile-view');
var photoButton = require('./photo.button');
var messageButton = require('./message.button');
var contactButton = require('./contact.button');
var likeButton = require('./like.button');

module.exports = angular.module('app.ui.matches.components',[])
    .directive('likeButton', likeButton)
    .directive('contactButton', contactButton)
    .directive('messageButton', messageButton)
    .directive('photoButton', photoButton)
    .directive('profileView', profileView);
    
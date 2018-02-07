'use strict';
var angular = require('angular');
// var registercomponents = require('./components');
 var searchRoutes = require('./search.route');
 var searchByController = require('./searchby/searchby.controller');
 var searchHistoryController = require('./search_history/search.history.controller');
var searchResultController = require('./search_result/search.result');
// var MoreInfoController = require('./more-info/moreInfo.controller');
// var OtpVrController = require('./otp-verification/otp.controller');
// var HelpMeWriteController = require('./help-me-write/help-me-write');
// var CropModalController = require('./crop-modal/crop-modal');
// var cropDirective = require('./crop-modal/ng-img-crop');
// var goToMoreController=require('./goto-moreinfo-modal/goto-moreinfo-modal');
//services//
var searchService = require('./search.service');
module.exports = angular.module('app.ui.srarch', [])
    .run(searchRoutes)
    .factory("searchService",searchService)
    .controller('searchByController', searchByController)
    .controller('searchResultController', searchResultController)
    .controller('searchHistoryController', searchHistoryController).
    filter('height', function () {
      return function (item) {
        var ht=item.toString().split(".");
        var ht1=ht[0]+" ft ";
     
        var ht2=(parseInt(ht[1])===0  ? '' :parseInt(ht[1]) +" inc");
          return ht1+ht2;
      };
    }).filter('propsFilter', function() {
        return function(items, props) {
          var out = [];
      
          if (angular.isArray(items)) {
            var keys = Object.keys(props);
      
            items.forEach(function(item) {
              var itemMatches = false;
      
              for (var i = 0; i < keys.length; i++) {
                var prop = keys[i];
                var text = props[prop].toLowerCase();
                if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                  itemMatches = true;
                  break;
                }
              }
      
              if (itemMatches) {
                out.push(item);
              }
            });
          } else {
            // Let the output be the input untouched
            out = items;
          }
      
          return out;
        };
      });
    
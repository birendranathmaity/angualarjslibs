/* @ngInject */
module.exports = function (cfpLoadingBarProvider) {
  
    cfpLoadingBarProvider.parentSelector = 'body';
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
    cfpLoadingBarProvider.includeBar = true;
  this.$get = function () {
        return ;
    };
};
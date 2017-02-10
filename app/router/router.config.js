/* @ngInject */
module.exports = function ($stateProvider, $urlRouterProvider) {
    var config = {
        $stateProvider: $stateProvider,
        $urlRouterProvider: $urlRouterProvider
    };

    this.$get = function () {
        return {
            config: config
        };
    };
};
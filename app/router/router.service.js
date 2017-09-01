var _ = require('lodash');

/* @ngInject */
module.exports = function ($location, $rootScope, $state, routerConfig,$sessionStorage) {
    var stateProvider = routerConfig.config.$stateProvider,
        urlRouterProvider = routerConfig.config.$urlRouterProvider,
        handlingRouteChangeError = false;

    var service = {
        configureRoutes: configureRoutes,
        getRoutes: getRoutes
    };

    init();

    return service;

    // Private methods

    /**
     * Initializes route helper
     */
    function init() {
        handleRoutingTransition();
        handleRoutingErrors();
        handleRoutingSuccess();
    }

    /**
     * Configures each route with provided route provider
     *
     * @param routes - list of routes
     */
    function configureRoutes(routes) {
        _.each(routes, function (route) {
            route.config.resolve = route.config.resolve || {};
            stateProvider.state(route.name, route.config);
        });

        urlRouterProvider.otherwise('/');
    }

    /**
     * Gets all routes. It also lazy loads the routes from $route.routes if not already in routes.
     * @returns {Array}
     */
    function getRoutes() {
        var routes = [];
        _.each($state.get(), function (route) {
            if (!!route.title) {
                routes.push(route);
            }
        });

        return routes;
    }

    /**
     * Handles routing errors
     */
    function handleRoutingErrors() {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if (handlingRouteChangeError) {
                    return;
                }

                $rootScope.showGlobalLoader = false;
                handlingRouteChangeError = true;
                //var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
                //var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                //logger.error(msg, [current]);
                $location.path('/');
            }
        );
    }

    /**
     * Updates the page title when route has successfully changed
     *
     * binds to <title> in <head> block
     */
    function handleRoutingSuccess() {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.showGlobalLoader = false;
            handlingRouteChangeError = false;
            // $rootScope.title = config.appTitle + ' | ' + (toState.title || '');
            // config.previousState = config.loopCheck;
            // config.previousState = fromState;
            // config.previousParams = fromParams;
        });
    }

    /**
     * On start of transition, activates the loader.
     *
     * Note: There is also logic in here for when the app starts up. Also, cannot test this because we're intercepting
     * the route for redirect which does not play nicely with ui-router-extras during testing.
     */
    /* istanbul ignore next */
    function handleRoutingTransition() {
    //      $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
	// 	$rootScope.animation = currRoute.animation;
	//   });
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
if(!$sessionStorage.token){
 $location.path('/register');
}
      

        });
    }
};
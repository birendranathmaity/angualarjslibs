var _ = require('lodash');

/* @ngInject */
module.exports = function ($location, $rootScope, $state, logger, routerConfig, config, LocalStorage, UserPermissionsService) {
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
    function init () {
        routerConfig.config.resolveAlways = _.extend({}, routerConfig.config.resolveAlways, {
            permissions: function () {
                return UserPermissionsService.getUserPermissions();
            }
        });
        handleRoutingTransition();
        handleRoutingErrors();
        handleRoutingSuccess();
    }

    /**
     * Configures each route with provided route provider
     *
     * @param routes - list of routes
     */
    function configureRoutes (routes) {
        _.each(routes, function (route) {
            route.config.resolve = _.extend(route.config.resolve || {}, routerConfig.config.resolveAlways);
            stateProvider.state(route.name, route.config);
        });

        urlRouterProvider.otherwise('/');
    }

    /**
     * Gets all routes. It also lazy loads the routes from $route.routes if not already in routes.
     * @returns {Array}
     */
    function getRoutes () {
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
    function handleRoutingErrors () {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if (handlingRouteChangeError) {
                    return;
                }

                $rootScope.showGlobalLoader = false;
                handlingRouteChangeError = true;
                var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
                var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                logger.error(msg, [current]);
                $location.path('/');
            }
        );
    }

    /**
     * Updates the page title when route has successfully changed
     *
     * binds to <title> in <head> block
     */
    function handleRoutingSuccess () {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.showGlobalLoader = false;
            handlingRouteChangeError = false;
            $rootScope.title = config.appTitle + ' | ' + (toState.title || '');
            config.previousState = config.loopCheck;
            config.previousState = fromState;
            config.previousParams = fromParams;
        });
    }

    /**
     * On start of transition, activates the loader.
     *
     * Note: There is also logic in here for when the app starts up. Also, cannot test this because we're intercepting
     * the route for redirect which does not play nicely with ui-router-extras during testing.
     */
    /* istanbul ignore next */
    function handleRoutingTransition () {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var user = LocalStorage.getUser();
            if (!config.authorized && (!_.has(toState, 'data.authorization') || toState.data.authorization)) {
                // If not authorized, redirect to login
                event.preventDefault();
                config.returnState = toState.name;
                config.returnParams = toParams;
                $state.go('public.login');
            } else if (config.authorized && (toState.name === 'public.login' || _.find(toState.deepStateRedirect, _.matchesProperty('state', 'public.login')))) {
                // If authorized, redirect from login to default page
                event.preventDefault();
                $state.go(config.defaultRoute);
            } else if (_.has(toState, 'data.permissionsGroup') && !_.has(toState.data.permissionsGroup, user.permissionsGroup) && config.defaultRoute !== toState.name) {
                // If not in permissionsGroup, to default page
                event.preventDefault();
                $state.go(config.defaultRoute);
            } else {
                // Otherwise continue routing as normal
                $rootScope.showGlobalLoader = true;
            }
        });
    }
};
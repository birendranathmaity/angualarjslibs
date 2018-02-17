var _ = require('lodash');

/* @ngInject */
module.exports = function ($location, $rootScope, $state,$sessionStorage, routerConfig, loginservice) {
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

        urlRouterProvider.otherwise('/404');
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
            $location.path('/404');
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
        var stateChangeStarted = false;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

//if(toParams.permisstion === "NOACTION")

if(toState.name==="login"){
    console.log("hh")
   // $location.path("/kk");
    return;
}

            if(!$sessionStorage.token){
               // event.preventDefault();
                $location.path("/");
                return;

            }
            // if already authenticated...
          
        //  callR();
         //  event.preventDefault();
        //  if(!stateChangeStarted) {
        //     stateChangeStarted = true;
        //    // callR();
        //    callR()
        // }
       
        $rootScope.$broadcast("loadhedermenu", toState);
        var isAuthenticated = loginservice.isAuthenticated();
        
         var role;

         if (isAuthenticated.isAuth && isAuthenticated.role) {

             role=isAuthenticated.role;
           
            if (role === "FREEUSER" && toParams.permisstion === "ALLUSER") {
                return;

            }
            if (role === "FREEUSER" && toParams.permisstion === "NOACTION") {
                return;

            }
            
            if (role === "ADMIN" && toParams.permisstion === "ADMIN") {
               
                   return;
              }
              if (role === "ADMIN" && toParams.permisstion === "NOACTION") {
                
                   return;
              }
              if (role === "ADMIN" && toParams.permisstion === "ALLUSER") {
                
                event.preventDefault();
                return;
              }
             
            if (role === "ADMIN" && toParams.permisstion !== "ADMIN") {
                $location.path("/404");
                 return;
                
              }
            
         }
          if(!isAuthenticated.isAuth && !isAuthenticated.role){
           // console.log("no login and no role")
          
            $location.path("/register");
            return;
        }
        event.preventDefault();

       
         if (isAuthenticated.isAuth && !isAuthenticated.role) {
             
            loginservice
            .getAuthObject()
            .then(function (user) {
                if (user.user_role) {
                  
                    if (user.user_role === "FREEUSER" && toParams.permisstion === "ALLUSER") {
                        $state.go(toState, toParams);
                        return;
        
                    }
                    if (user.user_role === "FREEUSER" && toParams.permisstion === "ADMIN") {
                       
                        $state.go("root.404");
                          return;
                      }
                    if (user.user_role === "FREEUSER" && toParams.permisstion === "NOACTION") {
                        $state.go(toState, toParams);
                           return;
                      }
                      if (user.user_role === "ADMIN" && toParams.permisstion === "ADMIN") {
                        
                        $state.go(toState, toParams);
                           return;
                      }
                    if (user.user_role === "ADMIN" && toParams.permisstion === "ALLUSER") {
                      
                      $state.go("root.404");
                         return;
                    }
                    if (user.user_role === "ADMIN" && toParams.permisstion === "NOACTION") {
                        $state.go(toState, toParams);
                           return;
                      }
                    if (user.user_role === "ADMIN" && toParams.permisstion !== "ALLUSER") {
                        $state.go(toState, toParams);
                     
                           return;
                      }
                    
                }
            });
             

         }
          

        });
    }
};
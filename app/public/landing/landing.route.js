/* @ngInject */
module.exports = function LandingRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.landing",
            config: {
                url: '/landing',
                views: {
                    
                    '@': {
                        templateUrl: "app/public/landing/landing.html",
                        controller: "LandingController as ctrl"
                    }
                },
                title: 'Landing'
            }
        }
    ]);
};
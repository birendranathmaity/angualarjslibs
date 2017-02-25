/* @ngInject */
module.exports = function ProviderRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.provider",
            config: {
                url: '/provider',
                views: {
                    '@': {
                        templateUrl: "app/provider/dashboard/dashboard.html",
                        controller: "ProviderDashboardController as ctrl"
                    }
                },
                title: 'Provider Dashboard'
            }
        },
        {
            name: "root.provider.emergency",
            config: {
                url: '/emergency',
                views: {
                    '@': {
                        templateUrl: "app/provider/emergency/providerEmergency.html",
                        controller: "ProviderEmergencyController as ctrl"
                    }
                },
                title: 'Provider Emergency'
            }
        }
    ]);
};

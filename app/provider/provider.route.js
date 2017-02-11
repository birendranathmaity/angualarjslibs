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
        }
    ]);
};

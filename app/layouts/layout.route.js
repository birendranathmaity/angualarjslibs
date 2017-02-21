/* @ngInject */
module.exports = function BaseRoutes(Router) {
    Router.configureRoutes([
        {
            name: 'default',
            config: {
                url: '/',
                deepStateRedirect: {
                    default: {
                        state: 'landing'
                    }
                }
            }
        },
        {
            name: 'root',
            config: {
                url: '',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'app/layouts/header.html',
                        controller: 'HeaderController as ctrl'
                    }
                }
            }
        },
        {
            name: 'public',
            config: {
                url: '',
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'app/layouts/public.html'
                    }
                }
            }
        }
    ]);
};
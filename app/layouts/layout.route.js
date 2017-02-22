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
        },
        {
            name: 'auth',
            config: {
                url: '/auth',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'app/layouts/header.html',
                        controller: 'HeaderController as ctrl'
                    },
                    'sidebar': {
                        templateUrl: 'app/layouts/sidebar.html',
                        controller: 'SidebarController as ctrl'
                    }
                }
            }
        },
        {
            name: "auth.patient",
            config: {
                url: '/patient',
                views: {
                    '@': {
                        templateUrl: "app/layouts/auth.html"
                    }
                },
                title: "Patient Auth Dashboard"
            }
        },
        {
            name: "auth.provider",
            config: {
                url: '/provider',
                views: {
                    '@': {
                        templateUrl: "app/layouts/auth.html"
                    }
                },
                title: "Provider Auth Dashboard"
            }
        }
    ]);
};
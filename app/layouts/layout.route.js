/* @ngInject */
module.exports = function BaseRoutes(Router) {
    Router.configureRoutes([
        {
            name: 'default',
            config: {
                url: '/',
                abstract: true,
                deepStateRedirect: {
                    default: {
                        state: 'register'
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
                    },
                     'leftsidebar': {
                        templateUrl: 'app/layouts/sidebar.html',
                        controller: 'SidebarController as ctrl'
                    },
                   
                    
                     'footer': {
                        templateUrl: 'app/layouts/footer.html'
                       
                    }
                }
            }
        },
        {
            name: "root.404",
            config: {
                url: '/404',
                views: {
                    '@': {
                        templateUrl: 'app/layouts/404.html'
                        
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER','GUEST','ADMIN']
                    }
                  },
                title: '404'
            }
        }
      
    ]);
};
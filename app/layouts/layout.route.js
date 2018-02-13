/* @ngInject */
module.exports = function BaseRoutes(Router) {
    Router.configureRoutes([
        {
            name: 'default',
            config: {
                url: '/',
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
            name: '404',
            config: {
                url: '/404',
                abstract: true,
                templateUrl: 'app/layouts/404.html'
                
            }
        }
        
      
    ]);
};
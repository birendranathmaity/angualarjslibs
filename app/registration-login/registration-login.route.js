/* @ngInject */
module.exports = function regisLoginRoutes(Router) {
    Router.configureRoutes([
        {
            name: "register",
            config: {
                url: '/register',
                              

                views: {
                    '@': {
                        templateUrl: "app/registration-login/registration/registration.html",
                        controller: "RegistrationController as ctrl"
                    }
                },
                 params: {
                    permisstion: "ALLUSER"
                },
                title: 'register'
            }
        },
        {
            name: 'login',
            config: {
                url: '/login',
               
                views: {
                    'header': {
                        templateUrl: 'app/layouts/login-header.html'
                        
                    },
                     'leftsidebar': {
                        templateUrl: 'app/layouts/sidebar.html',
                       
                    },
                   
                    '@': {
                        templateUrl: 'app/layouts/auth.html',
                        controller:"loginCtrl as ctrl"
                       
                        
                    },
                     'footer': {
                        templateUrl: 'app/layouts/footer.html'
                       
                    }
                }
            }
        },
          {
            name: "moreinfo",
            config: {
                url: '/moreinfo',
                views: {
                    '@': {
                        templateUrl: "app/registration-login/more-info/more-info.html",
                        controller: "MoreInfoController as ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'moreinfo'
            }
        }
    ]);
};

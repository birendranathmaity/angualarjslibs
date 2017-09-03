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

/* @ngInject */
module.exports = function regisLoginRoutes(Router,loginservice, $location) {
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
                data: {
                    permissions: {
                      only: ['FREEUSER','ADMIN'],
                      redirectTo: function(role,state){
                        var isAuthenticated = loginservice.isAuthenticated();
                       if (!isAuthenticated.isAuth){
                            return 'login';
                        }
                        else{
                            loginservice
                            .getAuthObject()
                            .then(function (user) {
                                if(isAuthenticated.isAuth && user.more_info_vr){
                                
                                    if(role==="ADMIN"){
                                        $location.path("/admin")
                                    }
                                    if(role==="FREEUSER"){
                                        $location.path("/dashboard")
                                    }
                                   
                                } 
                            });
                        }
                      
                       
                       
                      }
                    }
                  },
                title: 'moreinfo'
            }
        }
    ]);
};

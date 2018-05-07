/* @ngInject */
module.exports = function myHomeRoutes(Router,loginservice) {
Router.configureRoutes([
        {
            name: "root.dashboard",
            config: {
                url: '/dashboard',
                views: {
                    '@': {
                        templateUrl: "app/my-home/dashboard/dashboard.html",
                        controller: "DashboardController as ctrl"
                    }
                },
               
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
            
                title: ' Dashboard'
            }
        },
          {
            name: "root.myprofile",
            config: {
                url: '/myprofile',
                views: {
                    '@': {
                        templateUrl: "app/my-home/my-profile/my-profile.html",
                        controller: "MyProfileController as ctrl"
                    }
                },
               
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                title: 'My Profile'
            }
        },
          {
            name: "root.addphotos",
            config: {
                url: '/addphotos',
                views: {
                    '@': {
                        templateUrl: "app/my-home/add-photos/add-photos.html",
                        controller: "AddPhotosController as ctrl"
                    }
                },
               
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                     
                    }
                  },
                title: 'Add Photos'
            }
        },
        {
            name: "root.editprofile",
            config: {
                url: '/editprofile',
                views: {
                    '@': {
                        templateUrl: "app/my-home/edit-my-profile/edit-my-profile.html",
                        controller: "editMyProfileController as ctrl"
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
                   
                    editType:0
                  
                },
                title: 'editprofile'
            }
        }
    ]);
};

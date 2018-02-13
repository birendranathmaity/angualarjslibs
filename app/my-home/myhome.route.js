/* @ngInject */
module.exports = function myHomeRoutes(Router) {
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
                params: {
                    permisstion: "ALLUSER"
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
                params: {
                    permisstion: "ALLUSER"
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
                params: {
                    permisstion: "ALLUSER"
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
               
                params: {
                    permisstion: "ALLUSER",
                    editType:0
                  
                },
                title: 'editprofile'
            }
        }
    ]);
};

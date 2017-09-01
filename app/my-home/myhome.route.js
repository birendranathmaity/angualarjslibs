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
                title: 'Add Photos'
            }
        }
    ]);
};

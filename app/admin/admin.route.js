/* @ngInject */
module.exports = function adminRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.admindashboard",
            config: {
                url: '/admin',
                views: {
                    '@': {
                        templateUrl: "app/admin/home/dashboard/dashboard.html",
                        controller: "adminDashboardController as ctrl"
                    }
                },
                title: ' Admin Dashboard'
            }
        },
        {
            name: "root.adduser",
            config: {
                url: '/adduser',
                views: {
                    '@': {
                        templateUrl: "app/admin/user/adduser/adduser.html",
                        controller: "addUserController as ctrl"
                    }
                },
                title: ' User'
            }
        },
          {
            name: "root.viewusers",
            config: {
                url: '/viewusers',
                views: {
                    '@': {
                        templateUrl: "app/admin/user/viewuser/viewuser.html",
                        controller: "viewUserController as ctrl"
                    }
                },
                title: 'view user'
            }
        },
          {
            name: "root.newuser",
            config: {
                url: '/newuser',
                views: {
                    '@': {
                        templateUrl: "app/admin/user/newuser.html",
                        controller: "newUserController as ctrl"
                    }
                },
                title: 'New User'
            }
        },
        {
            name: "root.photoverificationuser",
            config: {
                url: '/pverification',
                views: {
                    '@': {
                        templateUrl: "app/admin/user/newuser.html",
                        controller: "PhotoVrController as ctrl"
                    }
                },
                title: 'Photo Verification'
            }
        }
    ]);
};

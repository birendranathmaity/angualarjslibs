/* @ngInject */
module.exports = function adminRoutes(Router) {
    Router.configureRoutes([{
            name: "root.admindashboard",
            config: {
                url: '/admin',
                views: {
                    '@': {
                        templateUrl: "app/admin/home/dashboard/dashboard.html",
                        controller: "adminDashboardController as ctrl"
                    }
                },
                params: {
                    permisstion: "ADMIN"
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
                params: {
                    permisstion: "ADMIN"
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
                params: {
                    permisstion: "ADMIN"
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
                params: {
                    permisstion: "ADMIN"
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
                params: {
                    permisstion: "ADMIN"
                },
                title: 'Photo Verification'
            }
        }
    ]);
};
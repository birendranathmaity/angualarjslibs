/* @ngInject */
module.exports = function adminRoutes(Router,loginservice) {
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
                data: {
                    permissions: {
                      only: ['ADMIN'],
                      redirectTo: loginservice.redirectTo()
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
                data: {
                    permissions: {
                      only: ['ADMIN'],
                      redirectTo: loginservice.redirectTo()
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
                data: {
                    permissions: {
                      only: ['ADMIN'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
                    userLoadType:null
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
                data: {
                    permissions: {
                      only: ['ADMIN'],
                      redirectTo: loginservice.redirectTo()
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
                data: {
                    permissions: {
                      only: ['ADMIN'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                title: 'Photo Verification'
            }
        }
    ]);
};
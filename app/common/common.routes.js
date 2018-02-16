/* @ngInject */
module.exports = function commonroutes(Router) {
    Router.configureRoutes([
        {
            name: "root.notifications",
            config: {
                url: '/notifications',
                views: {
                    '@': {
                        templateUrl: "app/common/notifications/notifications.html",
                        controller: "notificationController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'notifications'
            }
        },
        {
            name: "root.fullprofile",
            config: {
                url: '/fullprofile/:id',
                views: {
                    '@': {
                        templateUrl: "app/common/fullprofile/fullprofile.html",
                        controller: "fullprofileController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    isblock:false,
                },
                title: 'fullprofile'
            }
        },
        {
            name: "root.settings",
            config: {
                url: '/settings',
                views: {
                    '@': {
                        templateUrl: "app/common/settings/settings.html",
                        controller: "AccountSettingsController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'settings'
            }
        }
    ]);
};
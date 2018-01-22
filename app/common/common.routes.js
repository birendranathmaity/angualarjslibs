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
        }
    ]);
};
/* @ngInject */
module.exports = function BaseRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.patient.chat",
            config: {
                url: '/chat',
                views: {
                    '@': {
                        templateUrl: "app/common/chat/chat.html",
                        controller: "ChatController as ctrl"
                    }
                },
                title: "Patient Chat"
            }
        },
        {
            name: "root.provider.chat",
            config: {
                url: '/chat',
                views: {
                    '@': {
                        templateUrl: "app/common/chat/chat.html",
                        controller: "ChatController as ctrl"
                    }
                },
                title: 'Provider Chat'
            }
        },
    ]);
};
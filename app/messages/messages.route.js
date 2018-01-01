/* @ngInject */
module.exports = function myHomeRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.mail",
            config: {
                url: '/mail',
                views: {
                    '@': {
                        templateUrl: "app/messages/mail/mail.html",
                        controller: "mailController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'messages'
            }
        },
          {
            name: "root.photo_request",
            config: {
                url: '/photo_request',
                views: {
                    '@': {
                        templateUrl: "app/messages/photo_request/photo_request.html",
                        controller: "photoRequestController as ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'photo_request'
            }
        }
    ]);
};

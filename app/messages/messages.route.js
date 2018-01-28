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
                        templateUrl: "app/messages/request/request.html",
                        controller: "RequestController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    requestType:"PHOTO",
                    viewType:"RECEIVED"
                },
                title: 'photo_request'
            }
        },
        {
            name: "root.message_request",
            config: {
                url: '/message_request',
                views: {
                    '@': {
                        templateUrl: "app/messages/request/request.html",
                        controller: "RequestController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    requestType:"MESSAGE",
                    viewType:"RECEIVED"
                },
                title: 'message_request'
            }
        },
        {
            name: "root.contact_request",
            config: {
                url: '/contact_request',
                views: {
                    '@': {
                        templateUrl: "app/messages/request/request.html",
                        controller: "RequestController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    requestType:"CONTACT",
                    viewType:"RECEIVED"
                },
                title: 'contact_request'
            }
        },
    ]);
};

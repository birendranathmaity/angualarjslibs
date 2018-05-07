/* @ngInject */
module.exports = function myHomeRoutes(Router,loginservice) {
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
                    requestType:"CONTACT",
                    viewType:"RECEIVED"
                },
                title: 'contact_request'
            }
        },
    ]);
};

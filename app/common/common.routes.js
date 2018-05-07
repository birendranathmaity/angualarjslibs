/* @ngInject */
module.exports = function commonroutes(Router,loginservice) {
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                title: 'notifications'
            }
        },
        {
            name: "root.fullprofile",
            config: {
                url: '/fullprofile?:id',
                views: {
                    '@': {
                        templateUrl: "app/common/fullprofile/fullprofile.html",
                        controller: "fullprofileController as $ctrl"
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
                   
                    isblock:false
                },
                title: 'fullprofile'
            }
        },
        {
            name: "root.previewprofile",
            config: {
                url: '/previewprofile?:id',
                views: {
                    '@': {
                        templateUrl: "app/common/previewprofile/previewprofile.html",
                        controller: "previewprofileController as $ctrl"
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER','GUEST']
                    }
                  },
                params: {
                  
                    isblock:false
                },
                title: 'previewprofile'
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                title: 'settings'
            }
        }, {
            name: "root.whocanviewmyprofile",
            config: {
                url: '/whocanviewmyprofile',
                views: {
                    '@': {
                        templateUrl: "app/common/whocanviewmyprofile/who.view.profile.html",
                        controller: "WhoCanViewProfileController as $ctrl"
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER']
                    }
                  },
                title: 'whocanviewmyprofile'
            }
        }
    ]);
};
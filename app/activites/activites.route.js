/* @ngInject */
module.exports = function activitesRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.pre_location",
            config: {
                url: '/pre_location',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    activityType:"LOCATION"
                },
                title: 'pre_location'
            }
        },
        {
            name: "root.pre_education",
            config: {
                url: '/pre_education',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    activityType:"EDUCATION"
                },
                title: 'pre_education'
            }
        },
        {
            name: "root.pre_occupation",
            config: {
                url: '/pre_occupation',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    activityType:"OCCUPATION"
                },
                title: 'pre_occupation'
            }
        },
        {
            name: "root.viewed_profiles",
            config: {
                url: '/viewed_profiles',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    range:null,
                    activityType:"VIEWED_PROFILE"
                },
                title: 'viewed_profiles'
            }
        },{
            name: "root.liked_profiles",
            config: {
                url: '/liked_profiles',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    range:null,
                    activityType:"LIKED"
                },
                title: 'liked_profiles'
            }
        },
        {
            name: "root.visitor_profiles",
            config: {
                url: '/visitor_profiles',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    range:null,
                    activityType:"VISITOR"
                },
                title: 'visitor_profiles'
            }
        },
        {
            name: "root.recently_contacted",
            config: {
                url: '/recently_contacted',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    range:null,
                    activityType:"RECENTLT_CONTACTED"
                },
                title: 'recently_contacted'
            }
        },
        {
            name: "root.blocked_profiles",
            config: {
                url: '/blocked_profiles',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    activityType:"BLOCKED"
                },
                title: 'blocked_profiles'
            }
        },
        {
            name: "root.new_profiles",
            config: {
                url: '/new_profiles',
                views: {
                    '@': {
                        templateUrl: "app/activites/activity/activity.html",
                        controller: "activityController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER",
                    result:null,
                    activityType:"NEWPROFILES"
                },
                title: 'new_profiles'
            }
        }
    ]);
};

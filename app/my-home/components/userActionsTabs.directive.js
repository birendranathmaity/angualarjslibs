/* @ngInject */
module.exports = function ($rootScope, useractions,$state, searchService) {
    return {
        restrict: 'E',
        templateUrl: 'app/my-home/components/userActionsTabs.html',
        controllerAs: 'userActionsTabs',
        scope: {
            tabType: '@'
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
                controller.tabs1 = [
                    {
                        name: "PREFERRED_LOCATION",
                        count: 0,
                        type: "LOCATION",
                        route:"root.pre_location",
                        active: false,
                        users: []
                    },
                    {
                        name: "PREFERRED_EDUCATION",
                        count: 0,
                        type: "EDUCATION",
                        active: false,
                        route:"root.pre_education",
                        users: []
                    },
                    {
                        name: "PREFERRED_OCCUPATION",
                        count: 0,
                        type: "OCCUPATION",
                        active: false,
                        route:"root.pre_occupation",
                        users: []
                    }

                ];
                controller.tabs2 = [
                   
                    {
                        name: "PROFILE_VISITORS",
                        count: 0,
                        type: "VISITOR",
                        route:"root.visitor_profiles",
                        active: false,
                        users: []
                    },
                    {
                        name: "VIEWED_PROFILES",
                        count: 0,
                        type: "VIEWED_PROFILE",
                        route:"root.viewed_profiles",
                        active: false,
                        users: []
                    },
                    {
                        name: "LIKED_PROFILES",
                        count: 0,
                        type: "LIKED",
                        active: false,
                        route:"root.liked_profiles",
                        users: []
                    },
                    {
                        name: "RECENTLY_CONTACTED",
                        count: 0,
                        type: "RECENTLT_CONTACTED",
                        route:"root.recently_contacted",
                        active: false,
                        users: []
                    }

                ];

                var req = {
                    page: 1,
                    limit: 10,
                    gender: $rootScope.login_user_gender,
                    fields: {}
                };

                controller.loadViewType = function () {

                    searchService.getSearchResult(req, function (result) {

                        controller.users = result.users;
                        controller.count = result.total;
                        controller.result = result;

                    }, function (error) { });
                };
                function getUser(type) {

                    useractions.get_default_search_config(type, "LOGIN_USER", function (fields) {

                        req.fields = fields;
                        controller.loadViewType();
                    });

                }

                controller.loadTab = function (index, type) {
                    controller.count=null;
                    controller.loadtype = type;
                    controller.route = controller.tabs[index].route;
                    for (var i = 0; i < controller.tabs.length; i++) {
                        if (i === index) {
                            controller.tabs[index].active = true;
                            getUser(type);
                        }
                        else {
                            controller.tabs[i].active = false;
                        }
                    }

                };
                if($scope.tabType==="PREFFERED"){
                    controller.tabs=controller.tabs1;
                    controller.loadTab(0, "LOCATION");
                }
                if($scope.tabType==="ACTIVITY"){
                    controller.tabs=controller.tabs2;
                    controller.loadTab(0, "VISITOR");
                }
                controller.viewAll=function(){
                    $state.go(controller.route,{result:controller.result});
                };
            }
        ]
    };
};

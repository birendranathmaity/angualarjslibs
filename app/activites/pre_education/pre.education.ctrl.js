/* @ngInject */
module.exports = function PreEducationController($state, $location, searchService, $scope, useractions, $timeout, $rootScope, loginservice, matcheservice) {
    var controller = this;
    controller.result = $state.params.result;
    controller.fields = {};
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.userIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        page: controller.page,
        limit: controller.limit,
        gender: $rootScope.login_user_gender,
        fields: controller.fields
    };

    controller.pageChanged = function () {

        controller.selectedAll = false;

        controller.page = controller.page;

        req.page = controller.page;
        controller.loadViewType();

    };

    controller.loadViewType = function () {

        searchService.getSearchResult(req, function (result) {

            setUserData(result)
        }, function (error) { });

        //     if(controller.fields){
        //         serachResult();
        //     }


        //    else{
        //     searchService.getSearch({ user_id: $rootScope.login_user_id }, function (result) {
        //         if (result) {
        //             req.fields=result;
        //             controller.fields=result;
        //             req.gender=$rootScope.login_user_gender;
        //             serachResult();
        //         }

        //             },function(error){});
        //    }

    };


    function setUserData(result) {

        controller.pages = result.pages;
        controller.total = result.total;
        controller.users = result.users;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.users.length - 1;
    }

    function loadDefualt() {
        useractions.get_default_search_config("LOCATION","LOGIN_USER",function (fields) {
           

            req.fields = fields;
            controller.loadViewType();
        });


    }
    if (controller.result) {
        setUserData(controller.result);
    } else {
        loadDefualt();
    }

};
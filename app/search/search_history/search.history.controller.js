/* @ngInject */
module.exports = function searchResultController($rootScope, $state,searchService) {
    var controller = this;
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.resultsds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        page: controller.page,
        limit: controller.limit,
        user_id: $rootScope.login_user_id
    };

    controller.pageChanged = function () {

        controller.selectedAll = false;

        controller.page = controller.page;

        req.page = controller.page;
        controller.loadViewType();

    };
    function serachResults() {

        searchService.getSearchResults(req, function (result) {

            setUserData(result);
        }, function (error) { });
    }
    controller.loadViewType = function () {
        controller.resultsds = [];
        controller.selectedAll = false;
        serachResults();



    };


    function setUserData(result) {
        controller.searchResults = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.searchResults = result.searchResults;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.searchResults.length - 1;
    }

    controller.loadViewType();

    controller.goToSearch = function () {

    };
    controller.checkAll = function () {
        controller.resultsds = [];
        if (controller.selectedAll) {
            controller.selectedAll = true;
        } else {
            controller.selectedAll = false;
        }
        angular.forEach(controller.searchResults, function (sr) {
            sr.Selected = controller.selectedAll;
            if (sr.Selected) {
                controller.resultsds.push(sr._id);
            }

        });

    };
    controller.checkBoxSelect = function () {
        controller.resultsds = [];
        angular.forEach(controller.searchResults, function (sr) {
            if (sr.Selected) {
                controller.resultsds.push(sr._id);
            }


        });

    };
    controller.loadSearchResult=function(fields){
        $state.go('root.search_result', {fields:fields});
    };
    searchService.getSearch({ user_id: $rootScope.login_user_id }, function (result) {
        
                if (result) {
        
                    controller.fields = result;
                  
        
        
        
                }
                else {
                    controller.fields = "FIRST";
        
                }
            }, function (error) { });
};
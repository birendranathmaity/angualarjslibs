/* @ngInject */
module.exports = function searchByController($rootScope, $state,countryService, loginservice, searchService) {
    var controller = this;
    controller.searchFields=function(fields){
       
        $state.go('root.search_result', {fields:fields});
    };
    };
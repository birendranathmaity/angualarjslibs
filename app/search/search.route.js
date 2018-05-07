/* @ngInject */
module.exports = function searchRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.searchby",
            config: {
                url: '/searchby',
                              

                views: {
                    '@': {
                        templateUrl: "app/search/searchby/searchby.html",
                        controller: "searchByController as $ctrl"
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER']
                    }
                  },
                title: 'searchby'
            }
        },
          {
            name: "root.search_history",
            config: {
                url: '/search_history',
                views: {
                    '@': {
                        templateUrl: "app/search/search_history/search_history.html",
                        controller: "searchHistoryController as $ctrl"
                    }
                },
                data: {
                    permissions: {
                      only: ['FREEUSER']
                    }
                  },
                title: 'search_history'
            }
        },
        {
            name: "root.search_result",
            config: {
                url: '/search_result',
                views: {
                    '@': {
                        templateUrl: "app/search/search_result/search_result.html",
                        controller: "searchResultController as $ctrl"
                    }
                },
                params: {
                  
                    fields:null
                },
                data: {
                    permissions: {
                      only: ['FREEUSER']
                    }
                  },
                title: 'search_result'
            }
        }
    ]);
};
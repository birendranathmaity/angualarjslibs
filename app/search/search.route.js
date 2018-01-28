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
                 params: {
                    permisstion: "ALLUSER"
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
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'search_history'
            }
        }
    ]);
};
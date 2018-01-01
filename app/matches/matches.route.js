/* @ngInject */
module.exports = function myHomeRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.pre_matches",
            config: {
                url: '/pre_matches',
                views: {
                    '@': {
                        templateUrl: "app/matches/pre_matches/pre_matches.html",
                        controller: "PreMatchesController as $ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'Matches'
            }
        },
          {
            name: "root.dailymatches",
            config: {
                url: '/dailymatches',
                views: {
                    '@': {
                        templateUrl: "app/matches/dailymatches/dailymatches.html",
                        controller: "DailyMatchesController as ctrl"
                    }
                },
                params: {
                    permisstion: "ALLUSER"
                },
                title: 'daily matches'
            }
        }
    ]);
};

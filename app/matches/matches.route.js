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
                    permisstion: "ALLUSER",
                    result:null
                },
                title: 'Matches'
            }
         }
       
    ]);
};

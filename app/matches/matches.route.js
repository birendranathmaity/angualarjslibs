/* @ngInject */
module.exports = function myHomeRoutes(Router,loginservice) {
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
                data: {
                    permissions: {
                      only: ['FREEUSER'],
                      redirectTo: loginservice.redirectTo()
                    }
                  },
                params: {
                   
                    result:null
                },
                title: 'Matches'
            }
         }
       
    ]);
};

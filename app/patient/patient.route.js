/* @ngInject */
module.exports = function PatientRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.patient",
            config: {
                url: '/patient',
                views: {
                    '@': {
                        templateUrl: "app/patient/dashboard/dashboard.html",
                        controller: "PatientDashboardController as ctrl"
                    }
                },
                title: 'Patient Dashboard'
            }
        }
    ]);
};

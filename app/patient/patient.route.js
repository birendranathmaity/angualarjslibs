/* @ngInject */
module.exports = function PatientRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.patient",
            config: {
                url: '/patient',
                views: {
                    '@': {
                        templateUrl: "app/patient/login/login.html",
                        controller: "PatientLoginController as ctrl"
                    }
                },
                title: 'Patient Login'
            }
        },
        {
            name: "root.patient-registration",
            config: {
                url: '/patient-registration',
                views: {
                    '@': {
                        templateUrl: "app/patient/registration/registration.html",
                        controller: "PatientRegistrationController as ctrl"
                    }
                },
                title: 'Patient Registration'
            }
        }
    ]);
};

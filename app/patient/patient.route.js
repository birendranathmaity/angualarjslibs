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
        },
        {
            name: "root.patient-insurance",
            config: {
                url: '/patient-insurance',
                views: {
                    '@': {
                        templateUrl: "app/patient/insurance/insurance.html",
                        controller: "InsuranceController as ctrl"
                    }
                },
                title: 'patinet-insurance'
            }
        },
        {
            name: "root.patinet-personal-information",
            config: {
                url: '/patinet-personal-information',
                views: {
                    '@': {
                        templateUrl: "app/patient/personal-information/personal-information.html",
                        controller: " PersonalInformationController as ctrl"
                    }
                },
                title: 'personal-information'
            }
        },
        {
            name: "root.add-patient",
            config: {
                url: '/add-patient',
                views: {
                    '@': {
                        templateUrl: "app/patient/add-patient/add-patient.html",
                        controller: " AddPatientController as ctrl"
                    }
                },
                title: 'add-patient'
            }
        }
    ]);
};

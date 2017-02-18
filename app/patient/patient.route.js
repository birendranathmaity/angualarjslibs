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
                title: "Patient Dashboard"
            }
        },
        {
            name: "root.patient.registration",
            config: {
                url: '/registration',
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
            name: "root.patient.insurance",
            config: {
                url: '/insurance',
                views: {
                    '@': {
                        templateUrl: "app/patient/insurance/insurance.html",
                        controller: "PatientInsuranceController as ctrl"
                    }
                },
                title: 'Patinet Insurance'
            }
        },
        {
            name: "root.patient.personalInfo",
            config: {
                url: '/personalInfo',
                views: {
                    '@': {
                        templateUrl: "app/patient/personalInfo/personalInfo.html",
                        controller: " PersonalInfoController as ctrl"
                    }
                },
                title: 'Personal Information'
            }
        },
        {
            name: "root.patient.add",
            config: {
                url: '/add',
                views: {
                    '@': {
                        templateUrl: "app/patient/addPatient/addPatient.html",
                        controller: " AddPatientController as ctrl"
                    }
                },
                title: 'Add Patient'
            }
        }
    ]);
};
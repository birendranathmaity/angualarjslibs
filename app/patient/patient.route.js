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
                        controller: "PersonalInfoController as ctrl"
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
                        controller: "AddPatientController as ctrl"
                    }
                },
                title: 'Add Patient'
            }
        },
        {
            name: "root.patient.network",
            config: {
                url: '/network',
                views: {
                    '@': {
                        templateUrl: "app/patient/network/patientNetwork.html",
                        controller: "PatientNetworkController as ctrl"
                    }
                },
                title: 'Patient Networks'
            }
        },
        {
            name: "root.patient.network.add",
            config: {
                url: '/network/add',
                views: {
                    '@': {
                        templateUrl: "app/patient/network/addPatientNetwork.html",
                        controller: "AddPatientNetworkController as ctrl"
                    }
                },
                title: 'Add Patient Network',
                deepStateRedirect: true,
                sticky: true
            }
        },
        {
            name: "root.patient.appointments",
            config: {
                url: '/appointments',
                views: {
                    '@': {
                        templateUrl: "app/patient/appointments/appointments.html",
                        controller: "PatientAppointmentsController as ctrl"
                    }
                },
                title: 'Patient Appointments'
            }
        },
        {
            name: "root.patient.questionnaire",
            config: {
                url: '/questionnaire',
                views: {
                    '@': {
                        templateUrl: "app/patient/questionnaire/patientQuestionnaire.html",
                        controller: "PatientQuestionnaireController as ctrl"
                    }
                },
                title: 'Patient Questionnaire'
            }
        },
        {
            name: "root.patient.forms",
            config: {
                url: '/forms',
                views: {
                    '@': {
                        templateUrl: "app/patient/forms/patientForms.html",
                        controller: "PatientFormsController as ctrl"
                    }
                },
                title: 'Patient Questionnaire'
            }
        },
        {
            name: "root.patient.lookup",
            config: {
                url: '/lookup',
                views: {
                    '@': {
                        templateUrl: "app/patient/lookup/lookup.html",
                        controller: "PatientLookupController as ctrl"
                    }
                },
                title: 'Patient Lookup'
            }
        },
        {
            name: "root.patient.medicine",
            config: {
                url: '/medicine',
                views: {
                    '@': {
                        templateUrl: "app/patient/medicine/medicine.html",
                        controller: "PatientMedicineController as ctrl"
                    }
                },
                title: 'Patient Lookup'
            }
        },
        {
            name: "root.patient.reminders",
            config: {
                url: '/reminders',
                views: {
                    '@': {
                        templateUrl: "app/patient/reminders/patientReminder.html",
                        controller: "PatientReminderController as ctrl"
                    }
                },
                title: 'Patient Reminders'
            }
        }
    ]);
};
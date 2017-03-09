/* @ngInject */
module.exports = function ProviderRoutes(Router) {
    Router.configureRoutes([
        {
            name: "root.provider",
            config: {
                url: '/provider',
                views: {
                    '@': {
                        templateUrl: "app/provider/dashboard/dashboard.html",
                        controller: "ProviderDashboardController as ctrl"
                    }
                },
                title: 'Provider Dashboard'
            }
        },
        {
            name: "root.provider.emergency",
            config: {
                url: '/emergency',
                views: {
                    '@': {
                        templateUrl: "app/provider/emergency/providerEmergency.html",
                        controller: "ProviderEmergencyController as ctrl"
                    }
                },
                title: 'Provider Emergency'
            }
        },
        {
            name: "empty.prescribeMedicine",
            config: {
                url: '/prescribeMedicine',
                views: {
                    '@': {
                        templateUrl: "app/provider/patientCarePlan/medicine/medicine.html",
                        controller: "MedicineController as ctrl"
                    }
                },
                title: 'Plan Patient Medicine'
            }
        },
        {
            name: "root.provider.carePlan",
            config: {
                url: '/carePlan/:nodeTemplate',
                views: {
                    '@': {
                        templateUrl: "app/provider/carePlanSetup/carePlan.html",
                        controller: "CarePlanSetupController as ctrl"
                    },
                    'nodeInfo@view': {
                        templateUrl: "app/provider/patientCarePlan/exercise/exercise.html",
                        controller: "ExerciseController as ctrl"
                    }
                },
                title: 'Care Plan Setup'
            }
        },
        {
            name: "empty.prescribeExercise",
            config: {
                url: '/prescribeExercise',
                views: {
                    'nodeInfo': {
                        templateUrl: "app/provider/patientCarePlan/exercise/exercise.html",
                        controller: "ExerciseController as ctrl"
                    }
                },
                title: 'Plan Patient Exercise'
            }
        },
        {
            name: "empty.prescribeExerciseMindfulness",
            config: {
                url: '/prescribeExerciseMindfulness',
                views: {
                    '@': {
                        templateUrl: "app/provider/patientCarePlan/exercise-mindfulness/exerciseMindfulness.html",
                        controller: "ExerciseMindfulnessController as ctrl"
                    }
                },
                title: 'Plan Patient Exercise Mindfulness'
            }
        }
    ]);
};

/* @ngInject */
module.exports = function PatientDashboardController(/*PatientService*/) {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        getFeaturesMock();
    }

    function getFeatures() {
        /*PatientService.getFeatures()
         .then(function (response) {
         controller.features = response.features;
         })
         .catch(function (data) {
         console.log("Error:: " + data.toString());
         });*/
    }

    function getFeaturesMock() {
        controller.features = [
            {
                "type": "Questionnaire",
                "name": "Questionnaire",
                "count": "4",
                "status": "",
                "icon": "question-sign"
            },
            {
                "type": "notifications",
                "name": "Notifications",
                "count": "2",
                "status": "",
                "icon": "calendar"
            },
            {
                "type": "Provider",
                "name": "provider",
                "count": "2",
                "status": "",
                "icon": "user"
            },
            {
                "type": "Feature1",
                "name": "feature1",
                "count": "1",
                "status": "",
                "icon": "heart-empty"
            },
            {
                "type": "Feature2",
                "name": "feature2",
                "count": "1",
                "status": "",
                "icon": "blackboard"
            },
            {
                "type": "Feature3",
                "name": "feature3",
                "count": "1",
                "status": "",
                "icon": "grain"
            }
        ];
    }
};
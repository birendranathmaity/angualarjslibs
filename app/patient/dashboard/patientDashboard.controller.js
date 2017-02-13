/* @ngInject */
module.exports = function PatientDashboardController(PatientService) {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Need immediate attention';

        getFeatures();
    }

    function getFeatures() {
        PatientService.getFeatures()
            .then(function (response) {
                controller.features = response.features;
            })
            .catch(function (data) {
                console.log("Error:: " + data.toString());
            });
    }
};
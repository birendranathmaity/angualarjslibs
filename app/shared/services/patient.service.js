/* @ngInject */
module.exports = function PatientService(PatientResource) {

    var patientService = {
        getFeatures: getFeatures
    };

    return patientService;

    // Private Methods

    /**
     * Retrieves a list of features for dashboard
     *
     * @returns {*|Function}
     */
    function getFeatures() {
        return PatientResource.getFeatures();
    }

};
/* @ngInject */
module.exports = function PatientResource($resource, config) {
    // Private ngResource

    var resource = $resource(config.apiPath, null, {
        query: {
            method: 'GET',
            isArray: false
        },
        getFeatures: {
            method: 'GET',
            url: config.apiPath + 'app/serviceEndPoints/patientFeatures.json'
        }
    });

    // Public API
    var PatientResource = {
        getFeatures: getFeatures
    };

    return PatientResource;

    // Private methods
    /**
     * Get all patient features
     * @returns {*|Function}
     */
    function getFeatures() {
        return resource.getFeatures().$promise;
    }
};
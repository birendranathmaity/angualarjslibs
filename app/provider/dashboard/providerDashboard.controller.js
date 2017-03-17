/* @ngInject */
module.exports = function ProviderDashboardController(/*PatientService*/) {
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
                "type": "notifications",
                "name": "Notifications",
                "count": "2",
                "status": "",
                "icon": "calendar",
                "icon1": "calendar-o",
                "desc": "Reminders and appointments",
                "page": "root.patient.appointments"
            },
            {
                "type": "Emergency",
                "name": "Emergency",
                "count": "3",
                "status": "",
                "icon": "exclamation-triangle",
                "icon1": "ambulance",
                "desc": "Never too late",
                "page": "root.provider.emergency"
            },
            {
                "type": "Chat",
                "name": "Messaging",
                "count": "10",
                "status": "",
                "icon": "comments",
                "icon1": "comments-o",
                "desc": "Get connected",
                "page": "root.provider.chat"
            },
            {
                "type": "add-patient",
                "name": "Add Patient",
                "count": "",
                "status": "",
                "icon": "user-plus",
                "icon1": "",
                "desc": "Invite patient",
                "page": "root.patient.add"
            },
            {
                "type": "lookup",
                "name": "Patient Look up",
                "count": "",
                "status": "",
                "icon": "search",
                "icon1": "user-circle",
                "desc": "Find patient",
                "page": "root.patient.lookup"
            },
            {
                "type": "Forum",
                "name": "Forum",
                "count": "2",
                "status": "",
                "icon": "rss",
                "icon1": "th",
                "desc": "Discuss here",
                "page": "root.provider"
            }

        ];
    }
};
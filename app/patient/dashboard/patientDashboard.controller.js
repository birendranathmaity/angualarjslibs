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
                "type": "medicine",
                "name": "Medicine",
                "count": "4",
                "status": "",
                "icon": "medkit",
                "icon1": "",
                "desc": "Lorem ipsum dolor sit amet",
                "page": "landing"
            },
            {
                "type": "exercise-goals",
                "name": "Excercise Goals",
                "count": "3",
                "status": "",
                "icon": "line-chart",
                "icon1": "",
                "desc": "Vim detraxit senserit assentior ne",
                "page": "landing"
            },
            {
                "type": "exercise-mindfulness",
                "name": "Mindfulness Exercise",
                "count": "4",
                "status": "",
                "icon": "grav",
                "icon1": "",
                "desc": "Lorem ipsum dolor sit amet",
                "page": "landing"
            },
            {
                "type": "reminders",
                "name": "Reminders",
                "count": "9",
                "status": "",
                "icon": "bell",
                "icon1": "bell-o",
                "desc": "Quot dolorem intellegebat eu vis",
                "page": "root.patient.notifications"
            },
            {
                "type": "notifications",
                "name": "Notifications",
                "count": "2",
                "status": "",
                "icon": "calendar",
                "icon1": "calendar-o",
                "desc": "Ei vim sale natum animal",
                "page": "root.patient.notifications"
            },
            {
                "type": "Chat",
                "name": "Chat",
                "count": "10",
                "status": "",
                "icon": "comments",
                "icon1": "comments-o",
                "desc": "Quot dolorem intellegebat eu vis",
                "page": "root.patient.chat"
            },
            {
                "type": "questionnaire",
                "name": "Questionnaire",
                "count": "4",
                "status": "",
                "icon": "list-alt",
                "icon1": "",
                "desc": "Lorem ipsum dolor sit amet",
                "page": "root.patient.questionnaire"
            },
            {
                "type": "provider",
                "name": "Provider",
                "count": "2",
                "status": "",
                "icon": "user-md",
                "icon1": "user-plus",
                "desc": "Facete eripuit euripidis mea no",
                "page": "landing"
            },
            {
                "type": "network",
                "name": "Network",
                "count": "1",
                "status": "",
                "icon": "users",
                "icon1": "",
                "desc": "Ei quo sint inermis",
                "page": "landing"
            }

        ];
    }
};
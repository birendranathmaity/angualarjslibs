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
                "desc": "Drugs Prescription",
                "page": "root.patient.medicine"
            },
            {
                "type": "exercise-goals",
                "name": "Excercise Goals",
                "count": "3",
                "status": "",
                "icon": "line-chart",
                "icon1": "",
                "desc": "Keep you fit",
                "page": "root.patient.exercises"
            },
            {
                "type": "exercise-mindfulness",
                "name": "Mindfulness Exercise",
                "count": "4",
                "status": "",
                "icon": "grav",
                "icon1": "",
                "desc": "Sooth yourself",
                "page": "root.patient.exercise-mindfulness"
            },
            {
                "type": "reminders",
                "name": "Reminders",
                "count": "9",
                "status": "",
                "icon": "bell",
                "icon1": "bell-o",
                "desc": "See whats set-up for today",
                "page": "root.patient.reminders"
            },
            {
                "type": "apppointments",
                "name": "Appointments",
                "count": "2",
                "status": "",
                "icon": "calendar",
                "icon1": "calendar-o",
                "desc": "View/Set-up Appointments",
                "page": "root.patient.appointments"
            },
            {
                "type": "Chat",
                "name": "Chat",
                "count": "10",
                "status": "",
                "icon": "comments",
                "icon1": "comments-o",
                "desc": "Reach Us",
                "page": "root.patient.chat"
            },
            {
                "type": "questionnaire",
                "name": "Questionnaire",
                "count": "4",
                "status": "",
                "icon": "list-alt",
                "icon1": "",
                "desc": "Update Answers",
                "page": "root.patient.questionnaire"
            },
            {
                "type": "provider",
                "name": "Provider",
                "count": "",
                "status": "",
                "icon": "user-md",
                "icon1": "user-plus",
                "desc": "Grant Access",
                "page": "root.patient.network"
            },
            {
                "type": "network",
                "name": "Network",
                "count": "",
                "status": "",
                "icon": "users",
                "icon1": "",
                "desc": "Add Family and Friends",
                "page": "root.patient.addFamily"
            }

        ];
    }
};
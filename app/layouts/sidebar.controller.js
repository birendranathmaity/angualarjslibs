/* @ngInject */
module.exports = function SidebarController(/*PatientService*/) {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        getPatientFeaturesMock();

        bindSidebar();
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

    function bindSidebar() {
        /* off-canvas sidebar toggle */
        // $('[data-toggle=offcanvas]').click(function() {
        //     $('.row-offcanvas').toggleClass('active');
        //     $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
        // });
    }

    function getPatientFeaturesMock() {
        controller.features = [
            {
                "type": "questionnaire",
                "name": "Questionnaire",
                "count": "4",
                "status": "",
                "icon": "list-alt",
                "desc": "Lorem ipsum dolor sit amet, ea nam tamquam tractatos, te harum nostrud recusabo eos, ex nostrud perfecto deterruisset cum",
                "page": "landing"
            },
            {
                "type": "notifications",
                "name": "Notifications",
                "count": "2",
                "status": "",
                "icon": "calendar",
                "desc": "Ei vim sale natum animal. Qui utamur debitis necessitatibus ut, odio debet oratio an sit, consul ubique accusata eos eu.",
                "page": "auth.patient.notifications"
            },
            {
                "type": "provider",
                "name": "Provider",
                "count": "2",
                "status": "",
                "icon": "user",
                "desc": "Facete eripuit euripidis mea no. Atomorum sensibus per ad, ad partiendo similique pri.",
                "page": "landing"
            },
            {
                "type": "health",
                "name": "Health Monitor",
                "count": "1",
                "status": "",
                "icon": "heart-empty",
                "desc": "Vim detraxit senserit assentior ne, sit at tamquam noluisse, sea libris minimum ei.",
                "page": "landing"
            },
            {
                "type": "metrics",
                "name": "Metrics",
                "count": "1",
                "status": "",
                "icon": "stats",
                "desc": "Ei quo sint inermis, erant iriure offendit te pri.",
                "page": "landing"
            },
            {
                "type": "Chat",
                "name": "Chat",
                "count": "10",
                "status": "",
                "icon": "comment",
                "desc": "Quot dolorem intellegebat eu vis, et oblique maiorum habemus eam. Duo salutandi efficiantur ad, sea electram forensibus an.",
                "page": "landing"
            }
        ];
    }
};
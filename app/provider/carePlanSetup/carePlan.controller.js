var _ = require('lodash');

/* @ngInject */
module.exports = function CarePlanSetupController($scope, $window, GraphService) {
    var controller = this;
    controller.networkId = "carePlanNetwork";

    activate();

    /**
     * Initiate Controller.
     */
    function activate(isOnLoad) {

        //Build Data
        var graphData = GraphService.buildGraphData(),
            networkEl = document.getElementById(controller.networkId);

        GraphService.gDestroy(controller.context);

        //Draw Graph
        controller.context = GraphService.draw(networkEl, graphData);

        //Add events to on select
        GraphService.onSelect(controller.context);

        //Just a tweek to initiate font awesome icons
        $("#"+controller.networkId).css({'height': '499px'});


        if(!isOnLoad) {
            /**
             * Window resize event handling
             */
            angular.element($window).bind('resize', function () {
                activate(true);
            });
        }
    }
};

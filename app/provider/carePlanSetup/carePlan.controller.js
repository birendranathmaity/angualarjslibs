var _ = require('lodash');

/* @ngInject */
module.exports = function CarePlanSetupController($scope, GraphService) {
    var controller = this;
    controller.networkId = "carePlanNetwork";

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {

        //Build Data
        var graphData = GraphService.buildGraphData(),
            networkEl = document.getElementById(controller.networkId);

        GraphService.gDestroy(controller.context);

        //Draw Graph
        controller.context = GraphService.draw(networkEl, graphData);

        //Add events to on select
        GraphService.onSelect(controller.context);
    }
};

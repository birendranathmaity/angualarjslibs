var _ = require('lodash');

/* @ngInject */
module.exports = function CarePlanSetupController($scope, $window, $compile, GraphService) {
    var controller = this;
    controller.networkId = "carePlanNetwork";

    activate();

    /**
     * Initiate Controller.
     */
    function activate(isOnLoad) {

        //Build Data
        controller.graphData = controller.graphData || GraphService.buildGraphData();
        controller.networkEl = controller.networkEl || document.getElementById(controller.networkId);

        GraphService.gDestroy(controller.context);

        //Draw Graph
        controller.context = GraphService.draw(controller.networkEl, controller.graphData);

        //Add events
        addEvents();

        //Just a tweak to initiate font awesome icons
        $("#" + controller.networkId).css({'height': '499px'});

        //Redraw graph on service
        if (!isOnLoad) {
            redraw();
        }
    }

    function redraw() {
        /**
         * Window resize event handling
         */
        angular.element($window).bind('resize', function () {
            activate(true);
        });
    }

    function onSelect(params, nodeEl) {
        if(params.nodes.length) {
            nodeEl.css({
                left: params.pointer.DOM.x,
                top: params.pointer.DOM.y
            }).show();
        } else {
            nodeEl.hide();
        }
    }

    function addEvents() {

        //Create node info element to show data
        var infoEl = angular.element('<div class="node-info">Data goes here</div>');
        $("#" + controller.networkId).append(infoEl);
        $compile(infoEl)($scope);

        //Event goes here
        controller.context.on('select', function (params) {
            onSelect(params, infoEl);
        });
    }
};

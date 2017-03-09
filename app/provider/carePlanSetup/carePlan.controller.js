var _ = require('lodash');

/* @ngInject */
module.exports = function CarePlanSetupController($scope, $window, $compile, $stateParams, GraphService) {
    var controller = this;
    controller.networkId = "carePlanNetwork";
    controller.params = $stateParams;

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

    function processNodeChain(params) {
        var nodeId = ""+params.nodes[0],
            getNodeChain = nodeId.split("."),
            htmlText = "",
            sData = GraphService.getMockData(),
            node;

        switch(getNodeChain.length){
            case 1: htmlText = "Patient Selected";
                    break;
            case 2: htmlText = GraphService.getTypeName(getNodeChain[1]) + " Selected";
                    break;
            case 3:
                    var parentNodeName = GraphService.getTypeName(getNodeChain[1]);
                    node = sData[getNodeChain[1]][getNodeChain[2]];
                    htmlText = parentNodeName+"<br/>"+node.name+" Selected" ;
                    break;
            default: htmlText = "";
        }

        return htmlText;
    }

    function onSelect(params) {
        if(params.nodes.length) {

            controller.infoEl.html(processNodeChain(params));

            controller.infoEl.css({
                left: params.pointer.DOM.x,
                top: params.pointer.DOM.y
            }).show();
        } else {
            controller.infoEl.hide();
        }
    }

    function addEvents() {

        //Create node info element to show data
        controller.infoEl = angular.element('<div class="node-info"></div>');
        $("#" + controller.networkId).append(controller.infoEl);
        $compile(controller.infoEl)($scope);

        //Event goes here
        controller.context.on('select', function (params) {
            console.log(JSON.stringify(params));
            onSelect(params);
        });

        controller.context.on("dragStart", function (params) {
            controller.infoEl.hide();
        });
    }
};

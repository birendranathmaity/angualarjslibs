/* @ngInject */
module.exports = function GraphService() {
    var graphService = {
        getContext: getContext,
        draw: draw,
        redraw: reDraw,
        addNode: addNode,
        removeNode: removeNode,
        updateNode: updateNode,
        editEdge: editEdge,
        addEdge: addEdge,
        removeEdge: removeEdge,
        getOptions: getOptions,
        updateOptions: updateOptions,
        setEvent: setEvent,

    };

    return graphService;

    function getContext() {
        return vis.Network(networkEl, nData, oData);
    }

    function draw() {
        console.log("Draw goes here");
    }

    function reDraw() {

    }

    function addNode() {

    }

    function removeNode() {

    }

    function updateNode() {

    }

    function editEdge() {

    }

    function addEdge() {

    }

    function removeEdge() {

    }

    function getOptions() {

    }

    function updateOptions() {

    }

    function setEvent() {

    }

};
var _ = require('lodash');
/* @ngInject */
module.exports = function GraphService() {
    var graphService = {
        draw: draw,
        redraw: reDraw,
        addNode: addNode,
        removeNode: removeNode,
        updateNode: updateNode,
        editEdge: editEdge,
        addEdge: addEdge,
        removeEdge: removeEdge,
        updateOptions: updateOptions,
        setEvent: setEvent,
        buildNode: buildNode,
        buildEdge: buildEdge,
        buildNodesEdges: buildNodesEdges,
        getMockData: getMockData,
        buildGraphData: buildGraphData,
        onResize: onResize,
        gDestroy: gDestroy,
        onSelect: onSelect
    };

    return graphService;

    function buildGraphData() {
        var serverData = getMockData(),
        gData = buildNodesEdges(serverData);

        return {
            nodes: gData.nodes,
            edges: gData.edges
        };
    }

    function draw(networkEl, nData) {
        var oData = getOptions();
        return new vis.Network(networkEl, nData, oData);
    }

    function gDestroy(context) {
        if (context) {
            context.destroy();
            context = null;
        }
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

    function updateOptions() {

    }

    function setEvent() {

    }

    function buildNodesEdges(sData) {

        var gData = {nodes: [], edges: []},
            rootNode = buildNode({
                id: 1,
                type: "patient",
                metaData: {}
            });

        gData.nodes.push(rootNode);

        var parentId = rootNode.id;
        _.forEach(sData, function (data, key) {
            var node, edge;

            node = buildNode({
                id: ++parentId,
                type: key,
                metaData: data
            });

            //Builds edge FROM node to TO node
            edge = buildEdge(rootNode.id, parentId, key);

            gData.nodes.push(node);
            gData.edges.push(edge);

        });

        return gData;
    }

    function buildNode(data) {
        return {
            id: data.id,
            label: getTypeName(data.type),
            group: data.type
        };
    }

    function getColor (type) {
        return getOptions().groups[type].icon.color;
    }

    function getTypeName (type) {
        return getOptions().groups[type].name;
    }

    function buildEdge(from, to, key) {
        var color = getColor(key) || '#3A6073';
        return {
            from: from,
            to: to,
            color: { color: color }
        };
    }

    /**
     * get graph options
     * @returns
     */
    function getOptions() {
        return {
            interaction: {
                navigationButtons: true,
                keyboard: true
            },
            groups: {
                patient: {
                    name: "Patient",
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf2be',
                        size: 60,
                        color: '#3A6073'
                    }
                },
                questionnaires: {
                    name: "Questionnaires",
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf022',
                        size: 40,
                        color: '#FF9A40'
                    }
                },
                exercises: {
                    name: "Exercises",
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf2d6',
                        size: 40,
                        color: '#FFC240'
                    }
                },
                medicines: {
                    name: "Medicines",
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0fa',
                        size: 40,
                        color: '#74D1DA'
                    }
                },
                provider: {
                    name: "Provider",
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0f0',
                        size: 40,
                        color: '#b76ac4'
                    }
                }
            }
        };
    }

    function getMockData() {
        return {
            "questionnaires": [{
                "id": 1,
                "name": "Survey",
                "author": "Lisa Foster",
                "effectiveDate": "4/17/2016",
                "expiryDate": "7/16/2016",
                "questions": [{"id": 1, "question": "Donec ut dolor."}, {"id": 2, "question": "Donec dapibus."}]
            }, {
                "id": 2,
                "name": "Health",
                "author": "Bruce Tucker",
                "effectiveDate": "10/26/2016",
                "expiryDate": "9/21/2016",
                "questions": [{"id": 1, "question": "Nunc rhoncus dui vel sem. Sed sagittis."}]
            }, {
                "id": 3,
                "name": "Family History",
                "author": "Jane Watkins",
                "effectiveDate": "8/28/2016",
                "expiryDate": "11/9/2016",
                "questions": [{
                    "id": 1,
                    "question": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo."
                }, {
                    "id": 2,
                    "question": "Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante."
                }, {"id": 3, "question": "Morbi a ipsum. Integer a nibh. In quis justo."}]
            }],
            "exercises": [{"id": 1, "name": "video2", "duration": "30Mins"}, {
                "id": 2,
                "name": "video2",
                "duration": "2hr"
            }],
            "medicines": [{
                "id": 1,
                "name": "ALCOHOL",
                "dosage": "o-1-o",
                "effectiveDate": "3/14/2016",
                "endDate": "10/8/2016"
            }, {
                "id": 2,
                "name": "Argentum 5",
                "dosage": "1-1-1",
                "effectiveDate": "9/18/2016",
                "endDate": "1/27/2017"
            }, {
                "id": 3,
                "name": "STARCH, CORN",
                "dosage": "1-1-1",
                "effectiveDate": "5/19/2016",
                "endDate": "7/30/2016"
            }, {"id": 4, "name": "Adalimumab", "dosage": "1-o-1", "effectiveDate": "9/4/2016", "endDate": "11/11/2016"}]
        };
    }

    function onSelect(context) {
        context.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });
    }

    function onResize() {

    }

};
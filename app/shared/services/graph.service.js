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
        gDestroy: gDestroy
    };

    return graphService;

    function buildGraphData() {
        var serverData = getMockData(),
            gData = buildNodesEdges(serverData);

        return {
            nodes: new vis.DataSet(gData.nodes),
            edges: new vis.DataSet(gData.edges)
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
                id: 0,
                type: "patient"
            });

        gData.nodes.push(rootNode);

        var parentId = rootNode.id, nodeId = 1;
        _.forEach(sData, function (data, key) {
            var node, edge;

            node = buildNode({
                id: parentId + "." + (++nodeId),
                type: key,
                metaData: data
            });

            //Builds edge FROM node to TO node
            edge = buildEdge(node.id, key);

            gData.nodes.push(node);
            gData.edges.push(edge);

            //if data is array, it's a children, create nodes and edges
            if (_.isArray(data)) {
                _.forEach(data, function (item, itemIndex) {
                    var childNode, childEdge;
                    childNode = buildNode({
                        id: node.id + "." + itemIndex,
                        type: item.type,
                        metaData: item
                    });

                    //Builds edge FROM node to TO node
                    childEdge = buildEdge(childNode.id, item.type);

                    gData.nodes.push(childNode);
                    gData.edges.push(childEdge);
                });
            }

        });

        return gData;
    }

    function buildNode(data) {
        return {
            id: data.id,
            label: getTypeName(data.type) || data.metaData.name,
            group: data.type
        };
    }

    function getColor(type) {
        return getOptions().groups[type].icon.color;
    }

    function getTypeName(type) {
        return getOptions().groups[type].name;
    }

    /**
     * Build edge automatically with the node id
     * Node id is 1.1.1, parent would be 1.1
     * @param id
     * @param key
     * @returns {{from: string, to: *, color: {color: (*|string)}}}
     */
    function buildEdge(id, key) {
        var color = getColor(key) || '#3A6073';
        return {
            from: id.split(".").slice(0, -1).join('.'),
            to: id,
            color: {color: color}
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
            nodes: {
                color: {
                    background: '#f6f9fc'
                }
            },
            edges: {
                width: 2
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
                },
                questionnaire: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf03a',
                        size: 25,
                        color: '#FF9A40'
                    }
                },
                exercise: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf2dd',
                        size: 25,
                        color: '#FFC240'
                    }
                },
                medicine: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf205',
                        size: 25,
                        color: '#74D1DA'
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
                "author": "Judith Lawson",
                "effectiveDate": "8/1/2016",
                "expiryDate": "7/14/2016",
                "questions": [{"id": 1, "question": "In blandit ultrices enim.", "answer": false}, {
                    "id": 2,
                    "question": "Morbi a ipsum.",
                    "answer": false
                }, {
                    "id": 3,
                    "question": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                    "answer": false
                }],
                "type": "questionnaire"
            }, {
                "id": 2,
                "name": "Survey",
                "author": "Evelyn Daniels",
                "effectiveDate": "5/7/2016",
                "expiryDate": "7/10/2016",
                "questions": [{
                    "id": 1,
                    "question": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
                    "answer": true
                }, {
                    "id": 2,
                    "question": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
                    "answer": false
                }],
                "type": "questionnaire"
            }],
            "exercises": [{"id": 1, "name": "video2", "duration": "2hr", "type": "exercise"}, {
                "id": 2,
                "name": "video3",
                "duration": "30Mins",
                "type": "exercise"
            }, {"id": 3, "name": "video2", "duration": "1Hr", "type": "exercise"}],
            "medicines": [{
                "id": 1,
                "name": "Acetaminophen",
                "dosage": "1-o-1",
                "effectiveDate": "2/17/2017",
                "endDate": "8/10/2016",
                "type": "medicine"
            }, {
                "id": 2,
                "name": "ESZOPICLONE",
                "dosage": "1-1-1",
                "effectiveDate": "6/28/2016",
                "endDate": "4/21/2016",
                "type": "medicine"
            }, {
                "id": 3,
                "name": "Phenazopyridine",
                "dosage": "1-o-1",
                "effectiveDate": "11/5/2016",
                "endDate": "2/12/2017",
                "type": "medicine"
            }, {
                "id": 4,
                "name": "Omeprazole",
                "dosage": "o-1-o",
                "effectiveDate": "7/19/2016",
                "endDate": "9/13/2016",
                "type": "medicine"
            }]
        };
    }

};
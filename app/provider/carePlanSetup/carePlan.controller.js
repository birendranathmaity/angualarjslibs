var _ = require('lodash');

/* @ngInject */
module.exports = function CarePlanSetupController(GraphService) {
    var controller = this;
    controller.networkId = "carePlanNetwork";

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {

        //Get Data
        //Create Nodes
        //Create edges
        draw();
        GraphService.draw();
    }

    function draw() {
        var networkEl = document.getElementById(controller.networkId),
            nData = networkData(),
            oData = optionsData();

        controller.networkGraph = new vis.Network(networkEl, nData, oData);
    }

    function redraw(){

    }

    function networkData() {
        // create a network
        return {
            nodes: nodes(),
            edges: edges()
        };
    }

    function optionsData() {
        return {
            groups: {
                usergroups: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf0c0',
                        size: 50,
                        color: '#57169a'
                    }
                },
                users: {
                    shape: 'icon',
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf007',
                        size: 50,
                        color: '#aa00ff'
                    }
                }
            }
        };
    }

    function nodes() {
        return [{
            id: 1,
            label: 'User 1',
            group: 'users'
        }, {
            id: 2,
            label: 'User 2',
            group: 'users'
        }, {
            id: 3,
            label: 'Usergroup 1',
            group: 'usergroups'
        }, {
            id: 4,
            label: 'Usergroup 2',
            group: 'usergroups'
        }, {
            id: 5,
            label: 'Organisation 1',
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf1ad',
                size: 50,
                color: '#f0a30a'
            }
        }];
    }

    function edges() {
        return [{
            from: 1,
            to: 3
        }, {
            from: 1,
            to: 4
        }, {
            from: 2,
            to: 4
        }, {
            from: 3,
            to: 5
        }, {
            from: 4,
            to: 5
        }];
    }
};

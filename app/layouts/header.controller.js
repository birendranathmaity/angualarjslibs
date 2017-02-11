/**
 * Global header partial
 */
/* @ngInject */
module.exports = function HeaderController() {
    var controller = this;

    activate();

    /**
     * Sets listeners for toggling properties on the header
     */
    function activate() {
        //TODO - Get permissions, login details etc
        controller.user = {
            name: "venkata"
        };
    }

};

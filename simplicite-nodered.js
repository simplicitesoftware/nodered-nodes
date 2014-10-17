module.exports = function(RED) {
    function SimpliciteGrant(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on("input", function(msg) {
            // TODO
            msg.payload.grant = {};
            node.send(msg);
        });
    }
    RED.nodes.registerType("simplicite-grant", SimpliciteGrant);
}

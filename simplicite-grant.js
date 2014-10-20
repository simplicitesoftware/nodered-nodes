module.exports = function(RED) {
	function SimpliciteGrant(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.on("input", function(msg) {
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				this.server.session.getGrant().then(function(grant) {
					msg.payload = grant;
					node.send(msg);
				});
			} else
				console.log("No configuration");
		});
	}
	RED.nodes.registerType("simplicite-grant", SimpliciteGrant);
}

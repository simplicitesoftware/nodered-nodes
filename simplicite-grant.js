module.exports = function(RED) {
	function SimpliciteGrant(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.on("input", function(msg) {
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				this.server.session.getGrant(msg.payload).then(function(grant) {
					msg.payload = grant;
					node.send(msg);
				}, function(e) {
					msg.payload = { error: { message: e.message ? e.message : e } };
					node.send(msg);
				});
			} else {
				msg.payload = { error: { message: "No configuration" } };
				node.send(msg);
			}
		});
	}
	RED.nodes.registerType("simplicite-grant", SimpliciteGrant);
}

module.exports = function(RED) {
	function SimpliciteGrant(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.on("input", function(msg) {
			var params=  msg.payload;
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				this.server.session.getGrant({ inlinePicture: params && params.picture == "true" }).then(function(grant) {
					msg.payload = grant;
					node.send(msg);
				});
			} else
				console.log("No configuration");
		});
	}
	RED.nodes.registerType("simplicite-grant", SimpliciteGrant);
}

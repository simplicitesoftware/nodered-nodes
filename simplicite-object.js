module.exports = function(RED) {
	function SimpliciteObject(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		this.on("input", function(msg) {
			var params = msg.payload;
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				var obj = this.server.session.getBusinessObject(config.objectname);
				// Tmp
				msg.payload = obj;
				node.send(msg);
			} else
				console.log("No configuration");
		});
	}
	RED.nodes.registerType("simplicite-object", SimpliciteObject);
}

module.exports = function(RED) {
	function SimpliciteObject(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		this.on("input", function(msg) {
			var params = msg.payload;
			if (!params) params = {};
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				var obj = this.server.session.getBusinessObject(config.objectname);
				var action = params.action ? params.action : "metadata";
				if (action == "metadata") {
					obj.getMetadata({ context: params.context }).then(function(metadata) {
						msg.payload = metadata;
						node.send(msg);
					});
				} else {
					msg.payload = "Unknown action [" + action + "]";
					node.send(msg);
				}
			} else {
				msg.payload = "No configuration";
				node.send(msg);
			}
		});
	}
	RED.nodes.registerType("simplicite-object", SimpliciteObject);
}

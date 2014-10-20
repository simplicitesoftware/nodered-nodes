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
					obj.getMetadata(params).then(function() {
						msg.payload = obj;
						node.send(msg);
					});
				} else if (action == "search") {
					obj.search(params).then(function() {
						msg.payload = obj;
						node.send(msg);
					});
				} else if (action == "get") {
					obj.get(params.row_id).then(function() {
						msg.payload = obj;
						node.send(msg);
					});
				/*} else if (action == "create") {
					obj.create(params).then(function() {
						msg.payload = obj;
						node.send(msg);
					});
				} else if (action == "update") {
					obj.update(params).then(function() {
						msg.payload = obj;
						node.send(msg);
					});
				} else if (action == "delete") {
					obj.del(params).then(function() {
						msg.payload = obj;
						node.send(msg);
					});*/
				} else {
					obj.action(action, params).then(function(res) {
						msg.payload = res;
						node.send(msg);
					});
				}
			} else {
				msg.payload = "No configuration";
				node.send(msg);
			}
		});
	}
	RED.nodes.registerType("simplicite-object", SimpliciteObject);
}

module.exports = function(RED) {
	function SimpliciteInfo(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on("input", function(msg) {
			node.server = RED.nodes.getNode(config.server);
			if (node.server) {
				node.server.session.getAppInfo().then(function(appinfo) {
					msg.payload = { application: appinfo };
					node.server.session.getSysInfo().then(function(sysinfo) {
						msg.payload.system = sysinfo;
						node.send(msg);
					});
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
	RED.nodes.registerType("simplicite-info", SimpliciteInfo);
}

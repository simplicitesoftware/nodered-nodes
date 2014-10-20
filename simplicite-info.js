module.exports = function(RED) {
	function SimpliciteInfo(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.on("input", function(msg) {
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				this.server.session.getAppInfo().then(function(appinfo) {
					msg.payload = { application: appinfo };
					this.server.session.getSysInfo().then(function(sysinfo) {
						msg.payload.system = appinfo;
						node.send(msg);
					});
				});
			} else
				console.log("No configuration");
		});
	}
	RED.nodes.registerType("simplicite-info", SimpliciteInfo);
}

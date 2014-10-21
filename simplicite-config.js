module.exports = function(RED) {
	function SimpliciteConfig(n) {
		RED.nodes.createNode(this, n);
		this.session = require("simplicite").session({
			host: n.host,
			port: n.port,
			root: n.root,
			user: n.user,
			password: n.password,
			debug: n.debug == "true"
		});
	}
	RED.nodes.registerType("simplicite-config", SimpliciteConfig);
}

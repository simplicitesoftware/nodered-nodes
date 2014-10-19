module.exports = function(RED) {
	function SimpliciteConfig(n) {
		RED.nodes.createNode(this, n);
		this.host = n.host;
		this.port = n.port;
		this.root = n.root;
		this.user = n.user;
		this.password = n.password;
		this.session = require("simplicite").session({
			host: n.host,
			port: n.port,
			root: n.root,
			user: n.user,
			password: n.password,
			debug: true
		});
	}
	RED.nodes.registerType("simplicite-config", SimpliciteConfig);
}

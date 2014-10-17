module.exports = function(RED) {
	function SimpliciteAppNode(n) {
		RED.nodes.createNode(this, n);
		this.baseurl = n.baseurl;
		this.login = n.login;
		this.password = n.password;
	}
	RED.nodes.registerType("simplicite-app", SimpliciteApp);
	RED.library.register("simplicite-app");
}

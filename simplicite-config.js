module.exports = function(RED) {
	var cfEnv = require("cfenv");
	var appEnv = cfEnv.getAppEnv();
	//console.log("Application environment = " + JSON.stringify(appEnv, null, 2));
	var simpliciteService = appEnv.services.simplicite && appEnv.services.simplicite.length > 0 ? appEnv.services.simplicite[0].credentials : {};
	//console.log("Simplicite service = " + JSON.stringify(simpliciteService, null, 2));

	RED.httpAdmin.get('/simplicite-service', function(req, res) {
		res.send(JSON.stringify(simpliciteService));
	});

	function SimpliciteConfig(n) {
		RED.nodes.createNode(this, n);
		var params = {
			host: n.host != "" ? n.host : simpliciteService.host,
			port: n.port != "" ? parseInt(n.port) : simpliciteService.port,
			root: n.root != "" ? n.root : simpliciteService.root,
			user: n.user != "" ? n.user : "public",
			password: n.password != "" ? n.password : "simplicite",
			debug: n.debug == "true"
		};
		//console.log("Simplicite session parameters = " + JSON.stringify(params, null, 2));
		this.session = require("simplicite").session(params);
	}
	RED.nodes.registerType("simplicite-config", SimpliciteConfig);
}

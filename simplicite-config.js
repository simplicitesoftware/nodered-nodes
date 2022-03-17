module.exports = function(RED) {
	var cfEnv = require('cfenv');
	var appEnv = cfEnv.getAppEnv();
	var simpliciteService = appEnv.services.simplicite && appEnv.services.simplicite.length > 0 ? appEnv.services.simplicite[0].credentials : {};

	RED.httpAdmin.get('/simplicite-service', function(req, res) {
		res.send(JSON.stringify(simpliciteService));
	});

	function SimpliciteConfig(n) {
		RED.nodes.createNode(this, n);

		this.session = require('simplicite').default.session({
			host: n.host != '' ? n.host : simpliciteService.host,
			port: n.port != '' ? parseInt(n.port) : simpliciteService.port,
			root: n.root != '' ? n.root : simpliciteService.root,
			scheme: n.scheme ? n.scheme : simpliciteService.scheme,
			username: n.username != '' ? n.username : 'public',
			password: n.password != '' ? n.password : 'simplicite',
			debug: n.debug == 'true'
		});
	}

	RED.nodes.registerType('simplicite-config', SimpliciteConfig);
};

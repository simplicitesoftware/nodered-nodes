module.exports = function(RED) {
	function SimpliciteSession(config) {
		RED.nodes.createNode(this,config);
		const node = this;
		this.on('input', function(msg) {
			let params = msg.payload;
			if (!params)
				params = {};
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				const session = this.server.session;
				let action = '';
				if (config.action)
					action = config.action;
				if (params.action)
					action = params.action;
				if (action == '' || action == 'login') {
					session.login(params.parameters).then(user => {
						msg.payload = user;
						node.send(msg);
					}, e => {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == 'grant') {
					session.getGrant(params.parameters).then(grant => {
						msg.payload = grant;
						node.send(msg);
					}, e => {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == 'appinfo') {
					node.server.session.getAppInfo(params.parameters).then(appinfo => {
						msg.payload = appinfo;
						node.send(msg);
					}, e => {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == 'sysinfo') {
					node.server.session.getSysInfo(params.parameters).then(sysinfo => {
						msg.payload = sysinfo;
						node.send(msg);
					}, e => {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == 'news') {
					this.server.session.getNews(params.parameters).then(news => {
						msg.payload = news;
						node.send(msg);
					}, e => {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == 'logout') {
					session.logout(params.parameters).then(res => {
						msg.payload = res;
						node.send(msg);
					}, e => {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else {
					msg.payload = { error: { message: 'Unknow action' } };
					node.send(msg);
				}
			} else {
				msg.payload = { error: { message: 'No configuration' } };
				node.send(msg);
			}
		});
	}
	RED.nodes.registerType('simplicite-session', SimpliciteSession);
};

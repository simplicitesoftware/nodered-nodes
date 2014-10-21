module.exports = function(RED) {
	function SimpliciteSession(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.on("input", function(msg) {
			var params = msg.payload;
			if (!params) params = {};
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				var session = this.server.session;
				var action = "";
				if (params.action) action = params.action;
				if (config.action) action = config.action;
				if (action == "") {
					msg.payload = session;
					node.send(msg);
				} else if (action == "grant") {
					session.getGrant(msg.payload).then(function(grant) {
						msg.payload = grant;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "appinfo") {
					node.server.session.getAppInfo().then(function(appinfo) {
						msg.payload = appinfo;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "sysinfo") {
					node.server.session.getSysInfo().then(function(sysinfo) {
						msg.payload = sysinfo;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "news") {
					this.server.session.getNews(msg.payload).then(function(news) {
						msg.payload = news;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				/*
				TODO : other actions
				*/
				} else {
					msg.payload = { error: { message: "Unknow action" } };
					node.send(msg);
				}
			} else {
				msg.payload = { error: { message: "No configuration" } };
				node.send(msg);
			}
		});
	}
	RED.nodes.registerType("simplicite-session", SimpliciteSession);
}

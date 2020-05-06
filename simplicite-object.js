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
				var action = "";
				if (config.action) action = config.action;
				if (params.action) action = params.action;
				if (action == "") {
					msg.payload = obj;
					node.send(msg);
				} else if (action == "metadata") {
					obj.getMetadata(params.parameters).then(function() {
						msg.payload = obj.metadata;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "count") {
					obj.getCount(params.filters, params.parameters).then(function() {
						msg.payload = { count: obj.count };
						if (obj.maxpage > 0) msg.payload.maxpage = obj.maxpage;
						if (obj.filters) msg.payload.filters = obj.filters;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "search") {
					obj.search(params.filters, params.parameters).then(function() {
						msg.payload = { count: obj.count, list: obj.list };
						if (obj.page > 0) msg.payload.page = obj.page;
						if (obj.maxpage > 0) msg.payload.maxpage = obj.maxpage;
						if (obj.filters) msg.payload.filters = obj.filters;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "get") {
					obj.get(params.row_id, params.parameters).then(function() {
						msg.payload = obj.item;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "create") {
					obj.create(params.item, params.parameters).then(function() {
						msg.payload = obj.item;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else if (action == "update") {
					obj.update(params.item, params.parameters).then(function() {
						msg.payload = obj.item;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					})
				} else if (action == "delete") {
					obj.del(params.item, params.parameters).then(function() {
						msg.payload = {};
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				} else {
					obj.action(action, params.parameters).then(function(res) {
						msg.payload = res;
						node.send(msg);
					}, function(e) {
						msg.payload = { error: { message: e.message ? e.message : e } };
						node.send(msg);
					});
				}
			} else {
				msg.payload = { error: { message: "No configuration" } };
				node.send(msg);
			}
		});
	}
	RED.nodes.registerType("simplicite-object", SimpliciteObject);
}

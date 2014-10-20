module.exports = function(RED) {
	function SimpliciteNews(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		this.on("input", function(msg) {
			var params = msg.payload;
			this.server = RED.nodes.getNode(config.server);
			if (this.server) {
				this.server.session.getNews({ inlineImages: params && params.images == "true" }).then(function(news) {
					msg.payload = news;
					node.send(msg);
				});
			} else
				console.log("No configuration");
		});
	}
	RED.nodes.registerType("simplicite-news", SimpliciteNews);
}

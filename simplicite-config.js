module.exports = function(RED) {
  const cfEnv = require('cfenv');
  const appEnv = cfEnv.getAppEnv();
  const simpliciteService = appEnv.services.simplicite && appEnv.services.simplicite.length > 0 ? appEnv.services.simplicite[0].credentials : {};

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
      username: n.username != '' ? n.username : null,
      password: n.password != '' ? n.password : null,
      authtoken: n.authtoken != '' ? n.authtoken : null,
      endpoint: n.endpoint != '' ? n.endpoint : 'api',
      debug: n.debug == 'true'
    });
    this.session.debug(`Using simplicite client lib version ${this.session.constants.MODULE_VERSION}`);
  }

  RED.nodes.registerType('simplicite-config', SimpliciteConfig);
};

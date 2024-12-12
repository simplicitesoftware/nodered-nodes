module.exports = function(RED) {
  function SimpliciteObject(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    this.on('input', function(msg) {
      let params = msg.payload;
      if (!params)
        params = {};
      this.server = RED.nodes.getNode(config.server);
      if (this.server) {
        const obj = this.server.session.getBusinessObject(config.objectname);
        let action = '';
        if (config.action)
          action = config.action;
        if (params.action)
          action = params.action;
        let actionparam = '';
        if (config.actionparam)
          actionparam = config.actionparam;
        if (params.actionparam)
          actionparam = params.actionparam;
        if (action == '') {
          msg.payload = obj;
          node.send(msg);
        } else if (action == 'metadata') {
          obj.getMetadata(params.parameters).then(() => {
            msg.payload = obj.metadata;
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'count') {
          obj.getCount(params.filters, params.parameters).then(() => {
            msg.payload = { count: obj.count };
            if (obj.maxpage > 0) msg.payload.maxpage = obj.maxpage;
            if (obj.filters) msg.payload.filters = obj.filters;
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'search') {
          obj.search(params.filters, params.parameters).then(() => {
            msg.payload = { count: obj.count, list: obj.list };
            if (obj.page > 0) msg.payload.page = obj.page;
            if (obj.maxpage > 0) msg.payload.maxpage = obj.maxpage;
            if (obj.filters) msg.payload.filters = obj.filters;
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'get') {
          obj.get(params.row_id, params.parameters).then(() => {
            msg.payload = obj.item;
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'create') {
          obj.create(params.item, params.parameters).then(() => {
            msg.payload = obj.item;
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'update') {
          obj.update(params.item, params.parameters).then(() => {
            msg.payload = obj.item;
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'delete') {
          obj.del(params.item, params.parameters).then(() => {
            msg.payload = {};
            node.send(msg);
          }, e => {
            msg.payload = { error: { message: e.message ? e.message : e } };
            node.send(msg);
          });
        } else if (action == 'crosstab') {
          const name = actionparam || params.name || '';
          if (name != '') {
            obj.crosstab(name, params.parameters).then(res => {
              msg.payload = res;
              node.send(msg);
            }, e => {
              msg.payload = { error: { message: e.message ? e.message : e } };
              node.send(msg);
            });
          } else {
            msg.payload = { error: { message: 'Missing pivot table name' } };
            node.send(msg);
          }
        } else if (action == 'action') {
          const name = actionparam || params.name || '';
          if (name != '') {
            obj.action(name, params.row_id, params.parameters).then(res => {
              msg.payload = { result: res };
              node.send(msg);
            }, e => {
              msg.payload = { error: { message: e.message ? e.message : e } };
              node.send(msg);
            });
          } else {
            msg.payload = { error: { message: 'Missing custom action name' } };
            node.send(msg);
          }
        } else if (action == 'print') {
          const name = actionparam || params.name || '';
          if (name != '') {
            obj.print(name, params.row_id, params.parameters).then(res => {
              msg.payload = { result: res };
              node.send(msg);
            }, e => {
              msg.payload = { error: { message: e.message ? e.message : e } };
              node.send(msg);
            });
          } else {
            msg.payload = { error: { message: 'Missing publication name' } };
            node.send(msg);
          }
        } else {
          msg.payload = { error: { message: `Unknown action: ${action}` } };
          node.send(msg);
        }
      } else {
        msg.payload = { error: { message: 'No configuration' } };
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType('simplicite-object', SimpliciteObject);
};

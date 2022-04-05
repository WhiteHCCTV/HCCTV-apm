import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

function isDevServer() {
  return (typeof webpackHotUpdate == 'function');
}

if (isDevServer()) {
  console.log('Installing API mock');
  var mock = new MockAdapter(axios)

  mock.onGet("/ui/api/parts").reply(200,
    {"error":null,"items":[
      {"id":"1rTBqEpgZQQWpgjjW3i6xbOHOdK","handle":1,"label":"mockpart","init":true},
      {"id":"1rTMxG8GM3wb5CsxmXI93bjZqkN","handle":2,"label":"","init":false}
    ]}
  );
  
  mock.onGet("/ui/api/sys/stat").reply(function (req) {
    console.log(req)
    return [200, {
      error: null,
      timestamp: (new Date()).getTime() / 1000,
      stats: [
        { name: 'cpu', value: 30 + Math.random() * 20 },
        { name: 'mem', value: 30 + Math.random() * 2 },
      ]
    }]
  })

  mock.onGet("/ui/api/sys/info").reply(function() {
    var info = {
      "state": "SYS_READY",
      "version": "0.0.1",
      "hostname": "FLTeam",
      "hostip": "192.168.0.20",
      "fipsmode": true,
      "node_id": "nid_J5v4XOutkg0RZcdBh4LhMQ",
    };
    return [200, {
      "error": null,
      "info": info,
    }];
  })
  mock.onGet("/ui/api/healthz").reply(function() {
    return [200, {"info": {"database": true, "server": true, "aggregation": true}}]
  })

  mock.onGet("/ui/api/sys/summary").reply(function() {  
    return [200, {"summary": {"partitions": 2, "objects": 31, "connections": 3}}]
  })

  mock.onGet(/\/ui\/api\/log\/last.*/).reply(function() {
    return [200, {"logs":[
      {"cmd":"Model_Deploy","code":"0","accuracy":"34%","level":"info","logger":"audit","mech":"4160","msg":"Deploy new model:1.1.6","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620673048.5764067},
      {"cmd":"Round_End","code":"0","level":"info","logger":"audit","msg":"Federated averaging end","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620673048.2705195},
      {"cmd":"Round_Start","code":"0","level":"info","logger":"audit","msg":"Federated averaging start","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620672980.8857946},
      {"cmd":"Collect","code":"0","level":"info","logger":"audit","msg":"Collect weight from clients","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620673048.7256126},
      {"cmd":"Model_Deploy","code":"0","accuracy":"28%","level":"info","logger":"audit","mech":"4160","msg":"Deploy new model:1.1.5","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620673048.5764067},
      {"cmd":"Round_End","code":"0","level":"info","logger":"audit","msg":"Federated averaging end","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620673048.2705195},
      {"cmd":"Round_Start","code":"0","level":"info","logger":"audit","msg":"Federated averaging start","node_id":"nid_-8Rq5k2YYk6Ty_rg_N99pQ","ts":1620672980.8857946},
    ]}]
  })

}
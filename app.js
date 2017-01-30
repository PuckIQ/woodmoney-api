var express = require('express'),
  app = express();

var request = require('request'),
  routes = require('./routes'),
  config = require('./conf.js');

routes(app, request);

server.listen(config.httpPort, config.httpIP, function() {
  server.close(function() {
    server.listen(config.httpPort, config.httpIP);
  });
});

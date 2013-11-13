var http = require('http'),
    httpProxy = require('http-proxy'),
    program = require('commander');

program
  .option('--delay <msec>', 'delay all requests for [0] msec', Number, 0)
  .option('--emulate-error', 'all requests return HTTP 500', Boolean, false);

program.parse(process.argv); 	

var proxy = new httpProxy.RoutingProxy();

http.createServer(function (req, res) {

  var url = require('url').parse(req.url),
      buffer = httpProxy.buffer(req);

  setTimeout(function() {
    if (program.emulateError) {
      res.writeHead(500);
      res.end();
    } else {
      proxy.proxyRequest(req, res, {
        host: url.hostname,
        port: url.port || 80,
        buffer: buffer
      });
    }
  }, program.delay);
}).listen(8080);

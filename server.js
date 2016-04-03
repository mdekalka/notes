var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(request, response) {
  file.serve(request, response);
}).listen(8000);



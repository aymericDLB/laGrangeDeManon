var http = require('http');


var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world!');
});
server.listen(process.env.PORT);

console.log('The server is available at http://127.0.0.1:' + process.env.PORT + '/');
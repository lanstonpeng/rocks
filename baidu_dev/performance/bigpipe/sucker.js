var http = require('http'),
    fs = require('fs');

var server = http.createServer(function (req, res) {
  /*
  fs.readFile(__dirname + '/index.html', function (err, data) {
      res.end(data);
    });
    */
   var stream = fs.createReadStream(__dirname + '/index.html');
   stream.pipe(res);
});

server.listen(8000);

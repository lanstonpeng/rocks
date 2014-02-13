var http = require("http");
var crypto = require("crypto");
var server = http.createServer();
server.on("request",function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
});
server.on("upgrade",function(req,socket,upgradeHead){
  var header = req.headers;
  if(req.method == 'GET' 
    && header.upgrade
    && header.upgrade.toLowerCase() == 'websocket'
    && header.connection.toLowerCase() == 'upgrade'){
      var key = header['sec-websocket-key'];
      var shasum = crypto.createHash('sha1');
      var magic_string = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
      key = shasum.update(key+magic_string).digest('base64');
      socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
                           'Upgrade: WebSocket\r\n' +
                           'Connection: Upgrade\r\n' +
                           'Sec-WebSocket-Origin:null\r\n'+
                           'Sec-WebSocket-Accept:'+key+'\r\n'+
                           '\r\n');
    }
    console.log("connection established");
    //socket.setEncoding = 'utf8';
    var count = 1;
    socket.on('data',function(buff){
       console.log(buff);
       debugger;
       //console.log(buff.toString());
    });
    socket.on('close',function(e){
      console.log("closing"); 
    });
});
server.listen("8081",'127.0.0.1',function(){
  console.log("server established");
});
function decodeWebSocketData(data){
  
}

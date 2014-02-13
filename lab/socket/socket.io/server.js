var app = require('http').createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(8082);

io.sockets.on('connection', function (socket) {
  socket.emit("sys",{
     msg:"success",
     code:"200"
  });
  socket.on("sys",function(data){
     console.log("receive from client message: ", data); 
  });

  socket.on('message', function (data) {
    var msgType = data.msgType || "broadcast";
    console.log("onmessage: " + data.name);
    if(msgType == "broadcast"){
      socket.broadcast
            .to(data.room || "pool")
            //.emit('message', { msg:socket.id })
            .emit('message', { 
              msg:data.msg,
              name:data.name,
              type:msgType,
              dataType:data.dataType || "plainText"
            });
    }
    else if(msgType == "getsocketid"){
    }
    else if(msgType == "p2p"){
    }
    //boradcast to all clients except the sender
  });

  socket.on("join room",function(data){
    console.log("join room: " + data); 
    this.join(data.room || "pool");
  });
});

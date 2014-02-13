define(["../src/bower_components/socket.io-client/dist/socket.io","Emitter"],function(io,Emitter){
    var CONFIG = {
       serverURL:"http://localhost:8082" 
    };
    var Chatter = function(document,config){
      //[warning]:not support hints
      //[warning]:connect fail hints
      var socket = io.connect(config.serverURL);
      socket.on('sys', function (data) {
          //TODO
          console.log(data);
          if(data.msg == "success"){}
      });
      this.socket = socket;
      this.userInfo = {
           userid:"chatter" + parseInt(Math.random()*10000),
           name:"Anonymous#" + parseInt(Math.random()*10),
           socketID: this.socket.id
      };
      this.setUserName = function(name){
          this.userInfo.name = name;
      }
      this.socket.on("message",function(data){
          chatter.emit("receiveMessage",data);
      });
  };
  Chatter.prototype = new Emitter();
  var chatter = new Chatter(document,CONFIG);

  chatter
  .on("sendMessage",function(data){
      data = data || {};
      this.socket.emit("message",{
        room:this.userInfo.room || "main room",
        msg: data.msg || "hulaaa",
        name:this.userInfo.name,
        dataType:data.dataType || "plainText",
        msgType:data.msgType || "broadcast"
      });
  })
  .on("joinRoom",function(roomName){
      this.userInfo.room = roomName;
      this.socket.emit("join room",{
         room: roomName || "main room",
         userid:this.userInfo.userid,
         name:this.userInfo.name
      });
  });
  return chatter;
});

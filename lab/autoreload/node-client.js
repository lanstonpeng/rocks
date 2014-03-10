var sys = require("sys"),
    util = require("./node_modules/socket.io/lib/util"),
    WebSocket = require("./node_modules/socket.io/lib/transports/websocket"),
    EventEmitter = require("events").EventEmitter,
    io = {};

    var Socket = io.Socket = function(url){
      this.url = "ws://" + url; 
      this.open = false;
      this._heartbeats = 0;
    }

    Socket.prototype = new EventEmitter();
    Socket.prototype.connect = function(){
      var self = this;
      function sendHeartBeat(){}
      this.url = "ws://49.212.150.224:8088";
      this.conn = new WebSocket(this.url,"borf",{origin:"http://localhost"});
    }

    var s = new Socket();
    s.connect();




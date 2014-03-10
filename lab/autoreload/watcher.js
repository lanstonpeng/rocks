var watchr = require("watchr"),
    io = require("socket.io").listen(8088);

io.sockets.on("connection",function(socket){
  /*
  var pathsToWatch = [ "./css" ];
  watchr.watch({
    interval:0,
    paths:pathsToWatch,
    ignoreHiddenFiles:true,
    listeners:{
        change:function(changeType,filePath,fileCurrentStat,filePreviousStat){
          console.log(changeType + " -- " + filePath); 
          socket.emit("file",{
              changeType:changeType,
              filePath:filePath
          });
        }
    }
  });
  */
});



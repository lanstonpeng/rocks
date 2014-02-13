define(["Config","UIworker","Chatter","Drawer"],function(Config,UIworker,chatter,Drawer){
    "use strict"
    var KEY_ENDTER = 13;
    var template = "<div>{{name}}:{{msg}}</div>",
        room = document.querySelector("#room");

    function render(data){
      var pattern = /{{[\w.]+}}/g,
          matches = template.match(pattern),
          result = template;

      matches.map(function(val,idx){
        var keyPath = val.substring(2,val.length-2);
        result = result.replace(val,eval("data."+keyPath)); 
      });
      return result;
    }

    chatter.emit("joinRoom",window.location.host)
    chatter.on("receiveMessage",function(data){
        console.log(data);
        if(data.dataType == "json"){
          var json = JSON.parse(data.msg);
          Drawer.clearCanvas();
          Drawer.drawArrow(json.startPoint,json.endPoint);
        }
        else{
          var result = render(data); 
          room.innerHTML+=result;
        }
    });
    document.querySelector("#input input").addEventListener("keypress",function(e){
        var self = this;
        if(e.keyCode == KEY_ENDTER){
          chatter.emit("sendMessage",{
            msg:self.value
          });
        }
    },false);
});

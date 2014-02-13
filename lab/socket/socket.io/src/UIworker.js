define(["Config"],function(Config){

      var canvas = document.createElement("canvas");
      canvas.id = "chatter_canvas" + parseInt(Math.random()*1000);
      Config.canvasID = canvas.id;
      canvas.width = document.body.clientWidth;
      canvas.height= document.body.clientHeight;
      document.body.appendChild(canvas);

      var style = [
        "#",canvas.id,
        "{",
          "position:","absolute;",
          "left:","0;",
          "top:","1000px",
        "}"
      ].join("");
      var styleNode = document.createElement("style");
      styleNode.id = "chatter_stylenode" + parseInt(Math.random()*1000);
      Config.styleNodeID = styleNode.id;
      styleNode.innerHTML = style;
      document.head.appendChild(styleNode);

      var setThroughResponsible= (function(){
        var originStyle = document.querySelector("#"+Config.styleNodeID).innerHTML;
        return function(flag){
            styleNode.innerHTML = originStyle + "pointer-events:" + flag?"none":"auto"; 
        };
      })(document);


    function showChatBubble(data){
    
      //[warning]:XSS
    }
    return {
        setThroughResponsible : setThroughResponsible 
    }
});

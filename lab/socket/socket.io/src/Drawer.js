define(["Chatter","Config"],function(chatter,Config){


    var Drawer = (function(document){
      var canvas = document.querySelector("#" + Config.canvasID),
          ctx = canvas.getContext("2d"),
          startPoint,
          endPoint,
          isBeginDraw = false,
          isFinishDraw = false;

      canvas.addEventListener("click",function(e){
        if(isBeginDraw){
            /*
            Chatter.sendMsg({
              msg:JSON.stringify({
                startPoint:startPoint,
                endPoint:endPoint
              }),
              dataType:"json"
            });
            */
           chatter.emit("sendMessage",{
              msg:JSON.stringify({
                startPoint:startPoint,
                endPoint:endPoint
              }),
              dataType:"json"
           });
        }
        startPoint = {
          x:e.clientX,
          y:e.clientY
        };
        isBeginDraw = !isBeginDraw;
      },false);

      canvas.addEventListener("mousemove",function(e){
        if(isBeginDraw){
          Drawer.clearCanvas();
          endPoint = {
            x:e.clientX,
            y:e.clientY
          };
          drawArrow(startPoint,endPoint); 
        }
      },false);
      function clearCanvas(){
          canvas.width = canvas.width; 
      }
      function drawLine(from,to){
            ctx.beginPath();
            ctx.moveTo(from.x,from.y);
            ctx.lineTo(to.x,to.y);
            ctx.stroke();
      }
      function drawArrow(from,to){
         var headlen = 10;   // length of head in pixels
         var angle = Math.atan2(to.y-from.y,to.x-from.x);
         ctx.moveTo(from.x, from.y);
         ctx.lineTo(to.x, to.y);
         ctx.lineTo(to.x-headlen*Math.cos(angle-Math.PI/6),to.y-headlen*Math.sin(angle-Math.PI/6));
         ctx.moveTo(to.x, to.y);
         ctx.lineTo(to.x-headlen*Math.cos(angle+Math.PI/6),to.y-headlen*Math.sin(angle+Math.PI/6));
         ctx.stroke();
      }
      return {
        drawLine:drawLine,
        drawArrow:drawArrow,
        clearCanvas:clearCanvas
      };
    })(document);
    return Drawer;
});

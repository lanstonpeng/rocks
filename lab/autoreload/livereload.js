var livereload = (function(window){
  var LIBURL = "http://49.212.150.224:7777/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js",
      document = window.document;

  var script = document.createElement("script");
  script.src= LIBURL;
  script.type = "text/javascript";
  document.head.insertBefore(script,document.head.lastElementChild);

  var realoader =(function(){
    return {
          getAllCssPaths:function(){
              //return  [].slice.call(document.querySelectorAll("link[rel=stylesheet]"),0);
              return  document.querySelectorAll("link[rel=stylesheet]");
          },
          alterCSS:function(filePath){
             var allCSSLinks = this.getAllCssPaths(),
                 ref;
             for(var i = 0,len = allCSSLinks.length;i<len; i++){
                ref = allCSSLinks[i];
                if(RegExp(filePath).test( ref.href)){
                  ref.href = ref.href.replace(/\.css(.*)/,".css?"+this.getRandom());
                  break;
                }
             }
          },
          getRandom:function(){
              return parseInt(Math.random() * 1000);
          },
          reloadPage:function(){
              window.location.reload();
          }
        };
  })();

  script.onload = function(){
    var localURL = "http://localhost:8088",
        remoteURL="http://49.212.150.224:8088"; 
    var socket = io.connect(localURL);

    var cssReg = /\.css/;
    socket.on("file",function(data){
        if(data.changeType == "update"){
            if(cssReg.test(data.filePath )){
              realoader.alterCSS(data.filePath);
            }
            else{
              realoader.reloadPage(); 
            }
        }
        console.log(data);
    });
  }

})(window);

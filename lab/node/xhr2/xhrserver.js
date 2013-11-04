var http = require("http");
var url = require("url");

var data_source = "http://client.map.baidu.com/detail";

var json_raw = "";
var json_data = {};

var server = http.createServer(function(req,res){
    var parameters = "";
    var url_parse = url.parse(req.url);
    var request_url = data_source + "?" +(url_parse.query || "");
    var pre_html =' <!DOCTYPE HTML> <html lang="en"> <head> <meta charset="UTF-8"> <title></title> </head> <body> <script type="text/javascript"> var Pipe = (function(window){ var ORIGIN_ALLOW = "*"; function _wrapCallback(json_raw,callback){ var callback = callback || "fillTemplate"; var code = ["window.", callback, "(", json_raw, ")" ]; return code.join(""); } function _sendMessage(json,callback){ var parent = window.parent, data = JSON.stringify(json); debugger; data = _wrapCallback(data,callback); console.log("send from iframe " + data); parent.postMessage(data,ORIGIN_ALLOW); } return { sendMessage : _sendMessage } })(window); </script> ';

    res.setHeader('Access-Control-Allow-Origin', "*");
    //res.write(pre_html);

    request_url.indexOf("ninf") > 0 &&
    http.get(request_url,function(response){
      response.setEncoding('utf8');
      response.on("data",function(chunk){
          json_raw += chunk;
          //res.write(chunk);
      });
      response.on("end",function(){
        //json_raw= cutCallback(json_raw);
        json_data = JSON.parse(json_raw);
        /*
        jsonFormater.flushDetailInfo(json_data,res);
        res.write("\n========================\n");
        jsonFormater.flushRichInfo(json_data,res);
        res.write("\n========================\n");
        jsonFormater.flushReview(json_data,res);
        json_raw = "";
        res.end();
          res.write("\n========================\n");
          jsonFormater.flushDetailInfo(json_data,res);
          res.write("\n========================\n");
          jsonFormater.flushRichInfo(json_data,res);
          json_raw = "";
          res.end("</body></html>");
        */
        //setTimeout(function(){
          jsonFormater.flushDetailInfo(json_data,res);
        //},3000);
        //setTimeout(function(){
          jsonFormater.flushReview(json_data,res);
        //},4500);
        //setTimeout(function(){
          jsonFormater.flushRichInfo(json_data,res);
          json_raw = "";
          //res.end("</body></html>");
          res.end();
        //},6000);
        /*
        //res.end(JSON.stringify(json_data));
        /*
        res.write("<script>window.scrollTo(0,document.body.clientHeight)</script>")
        setTimeout(function(){
          res.end("yep");
        },5000)
        */
      });
    });
});
server.listen(3600,function(e){
    console.log("walo");
});

function cutCallback(str){
    return str;
}

var jsonFormater = (function(){

  function _cutDetail(data,res){
    var _data = {
      content:{
        ext:{
          detail_info:data.content.ext.detail_info
        }
      }
    }
    //res.write(" <script>Pipe.sendMessage( 'youku')   </script> ");
    //res.write("<script>Pipe.sendMessage(" + JSON.stringify(_data) + ")</script>");
    res.write(JSON.stringify(_data));
  }
  function _cutRichInfo(data,res){
      var _data = {
        content:{
          ext:{
            rich_info:data.content.ext.rich_info
          }
        }
      } 
    //res.write("<script>Pipe.sendMessage(" + JSON.stringify(_data) + ")</script>");
    //res.write(" <script>Pipe.sendMessage( 'hula')   </script> ");
    res.write(JSON.stringify(_data));
  }

  function _cutReview(data,res){
      var _data = {
        content:{
          ext:{
            review:data.content.ext.review
          }
        }
      } 
    //res.write(JSON.stringify(_data));
    //res.write("<script>Pipe.sendMessage(" + JSON.stringify(_data) + ")</script>");
    res.write(JSON.stringify(_data));
  }
  return {
    flushDetailInfo : _cutDetail,
    flushRichInfo:_cutRichInfo,
    flushReview:_cutReview
  }
})();

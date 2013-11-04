var http = require("http");
var url = require("url");

var data_source = "http://client.map.baidu.com/phpui2/?";

var json_raw = "";
var json_data = {};

var server = http.createServer(function(req,res){
    var parameters = "";
    var url_parse = url.parse(req.url),
         req_para = url.parse(req.url,true);
    var request_url = data_source + "?" +(url_parse.query || "");
    json_raw="";
    if(req_para.query.lanstonpeng){
      http.get(request_url,function(response){
        response.setEncoding('utf8');
        response.on("data",function(chunk){
            json_raw += chunk;
            //res.write(chunk);
        });
        response.on("end",function(e){
          res.end(json_raw); 
        });
      });
      return;
    }
    else{
      var pre_html =' <!DOCTYPE HTML> <html lang="en"> <head> <meta charset="UTF-8"> <title></title> </head> <body> <script type="text/javascript"> var Pipe = (function(window){ var ORIGIN_ALLOW = "*"; function _wrapCallback(json_raw,callback){ var callback = callback || "fillTemplate"; var code = ["window.", callback, "(", json_raw, ")" ]; return code.join(""); } function _sendMessage(json,callback){ var parent = window.parent, data = JSON.stringify(json); debugger; data = _wrapCallback(data,callback); console.log("send from iframe " + data); parent.postMessage(data,ORIGIN_ALLOW); } return { sendMessage : _sendMessage } })(window); </script> ';

      res.write(pre_html);

      json_raw = "";
      request_url.indexOf("ninf") > 0 &&
      http.get(request_url,function(response){
        response.setEncoding('utf8');
        response.on("data",function(chunk){
            json_raw += chunk;
            //res.write(chunk);
        });
        response.on("end",function(){
          json_raw= cutCallback(json_raw,req_para.query["callback"]);
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
            jsonFormater.importContext(json_data,res);
            jsonFormater.info_jet();
            jsonFormater.flushDetailInfo();
          //},3000);
          //setTimeout(function(){
            jsonFormater.flushReview();
          //},4500);
          //setTimeout(function(){
            jsonFormater.flushRichInfo();
            res.end("</body></html>");
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

    }
});
server.listen(3300,function(e){
    console.log("walo");
});

function cutCallback(json_raw,callback){
    var callback_length = callback.length;
    return json_raw.substring(callback_length*2+3,json_raw.length-1);
}

var jsonFormater = (function(){
  var data, res;
  function importContext(json_data,response){
    data =json_data ;
    res = response;
  }
  function _getInfo(key){
  
    var _data = {
      content:{
        ext:{
          detail_info:data.content.ext[key]
        }
      }
    }
    res.write("<script>Pipe.sendMessage(" + JSON.stringify(_data) + ")</script>");

  }
  function _cutDetail(){
    _getInfo("detail_info");
  }
  function _cutRichInfo(){
    _getInfo("rich_info");
  }

  function _cutReview(){
    _getInfo("review");
  }

  function _jet(){
    var _data = {
      content:{
        ext:{
          detail_info:{
            tag:data.content.ext.detail_info.tag,
            image:data.content.ext.detail_info.image,
            image_num:data.content.ext.detail_info.image_num
          },
          rich_info:{
            shop_hours:data.content.ext.rich_info.shop_hours 
          }
        }
      }
    } 
    res.write("<script>Pipe.sendMessage(" + JSON.stringify(_data) + ",'info_jet')</script>");
  }
  return {
    flushDetailInfo : _cutDetail,
    flushRichInfo:_cutRichInfo,
    flushReview:_cutReview,
    info_jet : _jet,
    importContext:importContext
  }
})();

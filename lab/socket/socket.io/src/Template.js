define(function(){
  var tmpl = document.getElementById("user_tmpl");
  var str = tmpl.innerHTML;

  window.str = str;
  var i = 0;
  arr = [];
  window.dataObj = {
    id:"__id__",
    from_user:"daddy",
    text:"youku",
    profile_image_url:"http://ruby-china.org/avatar/2252c5b22c1109861d8532e908afb8e7.png?s=96&d=404",
    users:[
      {
        url:"url1",
        name:"sucker1",
      },
      {
        url:"url2",
        name:"sucker2"
      }
    ]
  };

  
        str.replace(/[\r\n]/g," ")
           .replace(/<%[^=](.*?)%>/g,"');$1 arr.push('")
           //.replace(/<%=(.*?)%>/g,"',$1,'") ;
             debugger;
            return
  var func = new Function(
    "templateStr","dataObj",
    "var arr = [];" +
    "with(dataObj){arr.push('" +
        str.replace(/[\r\n]/g," ")
           .replace(/<%[^=](.*?)%>/g,"');$1 arr.push('")
           .replace(/<%=(.*?)%>/g,"',$1,'") +
    "');};"+
    "return arr.join('');"
  );
  debugger;
  var html = func(str,dataObj);
  document.body.innerHTML = html;
});

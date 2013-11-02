 var defer = function(){
  var queue = [],
      _value;
   return {
      resolve : function(value){
        _value = value;
        if(queue){
          queue.forEach(function(item,idx){
              item(value);
          });
          queue = null;
        }
      },
      then:function(callback){
        if(queue){
          queue.push(callback);
        }
        else{
          callback(_value);
        }
      }
   }
}

var a = function(){
    var d = new defer(); 
    setTimeout(function(){
      d.resolve("youku"); 
    },1000);
    return d;
 }
a().then(function(val){
  console.log(val);
});

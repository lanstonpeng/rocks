// Interface
var afterNSec = function(n){
  var deferred = new Defer();

  setTimeout(function(){
     deferred.resolve("youku"+n); 
  },n);
  return deferred.promise;
};


var a = afterNSec(1000);
var b = afterNSec(400);


a.then(b)
.then(function(value){
  console.log("first "+ value);
  return value + " from first";
})
.then(
  function(value){
    console.log("second " + value);
  }
);

function Defer(){
  var queue = [],
      isResolved = false,
      result;
  return {
      resolve:function(val){
         result = val;
         queue.forEach(function(item,idx){
            item(val);
         });
         isResolved = true;
      },
      promise:{
          then : function(func){
            var defer = new Defer();

            var callback = function(value){
                var _result;
                if(typeof func == "function" && !func.then){
                  _result = func(value);
                  defer.resolve(_result);
                }
                else if(func.then){
                  func.then( function(value){
                    //_result = func.then(value);
                    defer.resolve(value);
                  })
                }
            }
            if(!isResolved){
              queue.push( callback);
            }
            else{
              callback(result);
            }
            return defer.promise;
          }
      }
  }
}
/*
when = function(){}
when(a,b).then(
  function(value){
    console.log(value); 
  }
)
*/
// passing the result of the function execution

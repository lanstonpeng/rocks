define(function(){

/*
 on

 off

  */
 var Emitter = function(){
    "use strict"
    var EventPool = {},
        counter = 0;
    function _getEvtID(){
      return "eid" + ( counter ++ ) ;
    }
    return {
      getEvents:function(evt){
        var epRef,handlersRef;
        if(this.hasOwnProperty("_eid")){
            epRef = EventPool[this._eid];
            if(epRef && evt){
                return epRef[evt];
            }
        }
        return null;
      },
      on:function(evt,handler){
          var epRef,handlersRef;
          if(!this.hasOwnProperty("_eid")){
            this._eid = _getEvtID();
            EventPool[this._eid] = {};
          }
          epRef = EventPool[this._eid];
          !epRef[evt] && (epRef[evt] = []);
          epRef[evt].push(handler);
          return this;
      },
      off:function(evt,handler){
        var handlersRef = this.getEvents(evt);
        if(handlersRef){
          for(var i = 0 ;i < handlersRef.length;i++){
            if(handlersRef[i] == handler){
              handlersRef.splice(i,1);
              break;
            }
          }
        }
         return this;
      },
      emit:function(evt,args,context,callback){
        var handlersRef = this.getEvents(evt);
        if(handlersRef){
            args = toString.call(args) == "[object Array]"? args : [args];
            for(var i = 0,len = handlersRef.length;i<len; i ++){
              handlersRef[i].apply( context || this,args);
            }
        }
        callback && callback.call(this);
        return this;
      }
    };
 };
    return Emitter;
});

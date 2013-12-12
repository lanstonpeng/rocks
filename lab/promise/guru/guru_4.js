function cleanDesk(num){
    var guru = guruGenerator();
    setTimeout(function(){
        console.log("done" + num);
        guru.fulfil("Tony's finishing cleaning the nifty desk");
    },1000 * num);
    return guru.promise;
}
function isPromise(func){
        return func.when_done_call_this; // we simplify things here
}
function guruGenerator(){
    var memory = [];
    var promise = {
        when_done_call_this:function( things_need_to_do ){
            var anotherGuru = new guruGenerator();  
            
            var callback = function(value){
                if( isPromise( things_need_to_do) ){
                    //anotherGuru.fulfill();
                    things_need_to_do.when_done_call_this(
                        function(){
                           anotherGuru.fulfil(); 
                        }
                    );
                }
                else{
                    things_need_to_do();
                    anotherGuru.fulfil();
                }
            }
            memory.push(callback);
            return anotherGuru.promise;
        }
    };
    return {
        fulfil:function(val){
            memory.forEach(function(thing,idx){
                thing.call(null,val);
            });
        },
        promise:promise
    }
}
function playPokemon(){
    console.log("Go,Pikachu");
}
cleanDesk(2).when_done_call_this(cleanDesk(1)).when_done_call_this(playPokemon)
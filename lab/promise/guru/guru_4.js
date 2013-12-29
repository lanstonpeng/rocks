function isPromise(func){
        return func.when_done_call_this; // we simplify things here
    }

function playPokemon(guru){
        console.log("Go,Pikachu");
    }
function cleanDesk(){
    var guru = guruGenerator();
    setTimeout(function(){
        console.log("clean done");
        debugger;
        guru.fulfill("Tony's finishing cleaning the nifty desk");
    },1000);
    return guru.promise;
}
function washDish(){
    var guru = guruGenerator();
    setTimeout(function(){
        console.log("wash done");
        debugger;
        guru.fulfill("Tony's finishing washing the dishes");
    },1500);
    return guru.promise;
}
function guruGenerator(){
    var memory = [];
    var promise = {
        when_done_call_this:function( things_need_to_do ){
            var anotherGuru = new guruGenerator();  
            debugger;
            var callback = function(){
                debugger;
                if( isPromise( things_need_to_do) ){
                    things_need_to_do.when_done_call_this(
                        function(){
                           anotherGuru.fulfill(); 
                        }
                    );
                }
                else{
                    things_need_to_do();
                    anotherGuru.fulfill();
                }
            }
            memory.push(callback);
            return anotherGuru.promise;
        }
    };
    return {
        fulfill:function(val){
            memory.forEach(function(thing,idx){
                thing.call(null,val);
            });
        },
        promise:promise
    }
}
//cleanDesk().when_done_call_this(washDish()).when_done_call_this(playPokemon);
washDish().when_done_call_this(cleanDesk()).when_done_call_this(playPokemon);
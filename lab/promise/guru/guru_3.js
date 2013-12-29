function cleanDesk(){
    var guru = guruGenerator();
    setTimeout(function(){
        console.log("clean done");
        guru.fulfill("Tony's finishing cleaning the nifty desk");
    },1000 * Math.random());
    return guru.promise;
}
function washDish(){
    var guru = guruGenerator();
    setTimeout(function(){
        console.log("wash done");
        guru.fulfill("Tony's finishing washing the dishes");
    },1000 * Math.random());
    return guru.promise;
}
function guruGenerator(){
        var memory = [];
        var promise = {
            when_done_call_this:function( things_need_to_do ){
                var anotherGuru = new guruGenerator();
                var callback = function(){
                    things_need_to_do(anotherGuru);
                }
                memory.push(callback);
                return anotherGuru.promise;
            }
        };
        return {
            fulfill:function(val){
                debugger;
                memory.forEach(function(thing,idx){
                    thing.call(null,val);
                });
            },
            promise:promise
        }
    }

function playPokemon(guru){
        console.log("Go,Pikachu");
        guru.fulfill();
    }
//let poor Tony play Pokemon twice~
//cleanDesk().when_done_call_this(playPokemon).when_done_call_this(playPokemon);
cleanDesk().when_done_call_this(washDish).when_done_call_this(playPokemon);

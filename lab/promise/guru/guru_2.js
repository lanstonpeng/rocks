function cleanDesk(){
    var guru = guruGenerator();
    setTimeout(function(){
        guru.fulfil("Tony's finishing cleaning the nifty desk");
    },1000 * Math.random());
    return guru.promise;
}
function guruGenerator(){
    var memory = [];
    var promise = {
        when_done_call_this:function( things_need_to_do ){
            var anotherGuru = new guruGenerator();     
            memory.push(things_need_to_do);
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

//let poor Tony play Pokemon twice~
cleanDesk().when_done_call_this(playPokemon).when_done_call_this(playPokemon);
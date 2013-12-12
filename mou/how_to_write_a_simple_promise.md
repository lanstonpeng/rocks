### How to write a simple Promise
- Questions  
	- How to make promise chainable 
	- Error Propagation
	- Message Passing

This post assumes that you have a basic knowledge on how to use the promise API  
Let's write a simple delay function with callback capability 

	var afterNsec = function(n,callback){
		setTimeout(function(){
			console.log("after " + n + " sec");
			callback && callback();
		},n);
	}
	afterNsec(1000,func);

`func` will be called after ~1 second  

Let's assume our leading actor is `Tony`,he'll be notified to do something;
Tony is asked to *clean the table* ,and after that he'll be asked to *boil the water*,and finally he'll be notified to *play pokemon games* ,and we may write something as following

	clean_table().then(boil_water).then(play_pokemon)

And back to the real world,we assume each labour cost Tony about a second(that's ridiculous,I know that)

	afterNsec(1000,function(){
		clean_table();
		afterNsec(1000,function(){
			boil_water();
			afterNsec(1000,function(){
				place_pokemon();
			})
		})
	})

And here's an other situation we may constantly encounter  

	Tony.when(clean_table,boil_water).then(play_pokemon)
	
Maybe we can deal with as following
	
	var item_done = 0;
	function check_if_everything_done(callback){
		(item_done == 2) && play_pokemon();
	}
	function clean_table(cb){
		//cleaning table so hard...
		setTimeout(function(){
			item_done ++;
			check_if_everything_done(cb);
		},time_to_finish)
	}
	function boil_water(cb){
		//bu bu bu
		setTimeout(function(){
			item_done ++;
			check_if_everything_done(cb);
		},another_time_to_finish);
	}
	
	clean_table(play_pokemon);
	boil_water(play_pokemon);
	
Solution above is not scaleable,we can't harmoniously deal with different numbers of async functions
So,how can grab a nice solution?
Imagine there's someone guarantees you that he will inform you the moment Tony's finishing cleaning table,we just leave what Tony should cover after his cleaning

	SomeonePromise(clean_table).then(do_something_else);

Ok,let's define the real clean_table
	
	function clean_table(){
		setTimeout(function(){
			console.log("Hu,I finish cleaning table");
		},1000);	
	}

Tony will be notified to play games only after his cleaning the table and boiling water
	



if a promise is already resolved,while adding a callback function which should be invoked immediately

a promise can only be resolve once
	

####let's make these to be chainable  
- we accomplish this by return a **promise** after each calling of then
- depending on different kinds of parameters(a promise or a callback function)
	- if it's a callback function
		- call it get return value , resolve the next promise
	- if it's a promise
		- enqueue the resolve function
	


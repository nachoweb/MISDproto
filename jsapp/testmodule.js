define(['text!templates/test.html'],function(text){
	var init=function(){
		//This is a comment to test the ugliflyyyyyyy
		$('body').append(text);
	};
	return {init:init};
});

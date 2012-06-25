//Pub Sub
define(['jquery'],function($){

//UTIL Tiny pubSub
var pubSubInit=function(){
	var o = $({});
  $.subscribe = function() {
    o.on.apply(o, arguments);
  };
  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };
  $.publish = function() {
    o.trigger.apply(o, arguments);
  };
};


return {init:pubSubInit};
});

define(['order!lib/jquery-1.7.2',
			 'order!lib/underscore-min',
			 'order!lib/backbone-min'],
function(){
  return {
    Backbone: Backbone.noConflict(),
    _: _.noConflict(),
    $: jQuery.noConflict()
  };
});

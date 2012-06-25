//loadUtils
require(['util/loading','util/pubSub'],function(loading,pubSub){
	
	pubSub.init();

	//loading requiere pubSub
	loading.init();
	

});

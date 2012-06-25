//Esto es una utilidad de loading que utiliza pubsub para mensajes 'load' y 'unload'
//Estara visible hasta que se hayan recibido un mensaje de unload por cada mensaje de load
define(function(){
var loadingInit=function(){
	var $el,handleLoad, handleUnload,pubs=[];
	$el=$('<span id="loading">Loading...</span>');
	
	//The loading publisher puede mandar un mensaje $.publish('load',['label id','mensaje']);
	handleLoad=function(e,id,men){
		if(id===null || id===undefined || id===0){id='default';}
		var mensaje='Loading...';
		if(men){mensaje='Loading '+men+'...';}
		$el.text(mensaje);
		if(pubs.indexOf(id)==-1){
			pubs.push(id);
			!$el.is(':visible') && $el.show();
		}
	};
	handleUnload=function(e,id){
		if(id===null || id===undefined || id===0){id='default';}
		var idx=pubs.indexOf(id);
		if(idx==-1){return;}
		pubs.splice(idx,1);
		pubs.length == 0 && $el.is(':visible') && $el.hide();
	};
	$(function(){
		$.subscribe('load',handleLoad);	
		$.subscribe('unload',handleUnload);	
		$('body').append($el);
	});

};


return {init:loadingInit};
});

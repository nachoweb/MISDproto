//Require configurations
require.config({
    paths : {
				text:'lib/requirejs/text',
        goog: 'lib/requirejs/goog',
        async: 'lib/requirejs/async',
				propertyParser : 'lib/requirejs/propertyParser',
				util: 'modules/utils'
    }
});


require(['test/test6',
				'jquery',
				'modules/loadUtils'], 
function(t,$) {
	//Creamos dominio propio para variables
		$.M={};

		$.M.test=t;	
		t.init();
});



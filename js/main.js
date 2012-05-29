// Author: Nacho Elguezabal nachoelg@gmail.com
// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
		loader: 'lib/loader', //Truco para cargar jquery,underscore y backbone en orden
    jQuery: 'lib/jquery',
    Underscore: 'lib/underscore',
    Backbone: 'lib/backbone',
    templates: '../templates',
    router:'app/router'
  }

});

require([
  'app/app'  
], function(App){
  App.initialize();
});

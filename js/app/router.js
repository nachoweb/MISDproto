// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showUsers',
      
      // Default
      '*actions': 'defaultAction'
    },
    showProjects: function(){
      alert("aqui se inicializa la ruta projects");
    },
    showUsers: function(){
      alert("aqui se inicializa la ruta users");
    },
    defaultAction: function(actions){
      // We have no matching route, lets display the home page 
      console.log(actions);
    }
  });

  var initialize = function(){
    var app_router = new AppRouter();
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});

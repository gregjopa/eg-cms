// eg-cms dynamically creates routes based on the number of sheets in the spreadsheet

// pass in an array of nav items
App.createRoutes = function(nav) {

  // map routes
  App.Router.map(function() {
    var self = this;
    nav.forEach(function(navItem, index) {
      self.route(navItem.get('name'));
    });
  });


  // extend routes
  nav.forEach(function(navItem, index) {
    var routeName = navItem.get('name').capitalize() + 'Route';
    App[routeName] = Ember.Route.extend({
      model: function() {
        return App.Page.find(navItem.get('id'));
      }
    });
  });


  // redirect to first page
  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      var pageName = nav.get('firstObject').get('name');
      this.transitionTo(pageName);
    }
  });


  // load application route w/ nav data
  App.ApplicationRoute = Ember.Route.extend({
    model: function() {
      return nav;
    },
    setupController: function(controller, model) {
      this.controllerFor('nav').set('content', model);
    }
  });

};





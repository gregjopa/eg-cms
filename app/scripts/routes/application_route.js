// eg-cms dynamically creates routes based on the number of sheets in the spreadsheet

App.createApplicationRoute = function(nav, globalPageIds) {

  App.ApplicationRoute = Ember.Route.extend({
    // load application route w/ data for all global pages
    model: function() {
      return App.Page.find(globalPageIds);
    },
    setupController: function(controller, model) {
      var globalPages = model.get('content');
      var data = {};

      globalPages.forEach(function(page, index) {
        data[page.get('name')] = page;
      });
      this.controller.set('data', data);
      this.controllerFor('nav').set('content', nav);
    }
  });

};


// pass in an array of nav items
App.createPageRoutes = function(nav) {

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


};





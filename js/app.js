App = Ember.Application.create({
  spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
  spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds'
});


// ROUTES

App.Router.map(function() {
  // TODO: remove hard-coding and dynamically map routes for each sheet in google spreadsheet
  this.route('home');
  this.route('about');
  this.route('contact');
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.MenuItem.find();
  },
  setupController: function(controller, model) {
    this.controllerFor('menu').set('content', model);
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('home');
  }
});




// CONTROLLERS

App.MenuController = Ember.ArrayController.extend();


App.HomeController = Ember.ObjectController.extend({
  test: 'test your mom'
});

App.AboutController = Ember.ObjectController.extend({
  test: 'test your mom2'
});

App.ContactController = Ember.ObjectController.extend({
  test: 'test your mom34'
});




// HELPERS

// linkToPage helper accepts a variable for the route name
// ex: {{#each model}} <li>{{#linkToPage name this}} {{name}} {{/linkToPage}}</li> {{/each}}
// helper code adapted from: http://stackoverflow.com/questions/15216356/how-to-make-linkto-dynamic-in-ember

Ember.Handlebars.registerHelper('linkToPage', function(name) {
  var routeName = Ember.Handlebars.get(this, name);
  arguments = [].slice.call(arguments, 2);
  arguments.unshift(routeName);
  return Ember.Handlebars.helpers.linkTo.apply(this, arguments);
});




// MODELS

App.MenuItem = Ember.Model.extend({
  id: Ember.attr(),
  sheetId: Ember.attr(),
  name: function() {
    return this.get('id')
  }.property('id')
});

// App.MenuItem.adapter = Ember.FixtureAdapter.create();

// App.MenuItem.FIXTURES = [
//   {id: 'home', spreadsheetId: 'od6'},
//   {id: 'about', spreadsheetId: 'od7'},
//   {id: 'contact', spreadsheetId: 'od8'}
// ];

App.MenuItem.adapter = Ember.Adapter.create({

  findAll: function(klass, records) {
    $.getJSON(App.spreadsheetRootUrl + '/worksheets/' + App.spreadsheetKey + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        var pages = [];

        response.feed.entry.forEach(function (entry) {
          // parse out the sheet id
          var sheetId = entry.id.$t.substring(entry.id.$t.lastIndexOf('/') + 1);
          var page = {
            id: entry.title.$t,
            sheetId: sheetId
          };
          pages.push(page);
        });
       records.load(klass, pages);
    });
  }

});


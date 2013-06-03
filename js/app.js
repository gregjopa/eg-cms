App = Ember.Application.create({
  spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
  spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds'
});

// ROUTES

App.Router.map(function() {
  this.resource('pages', {path: ''}, function() {
    this.resource('page', { path: ':page_id' })
  });
});

App.PagesRoute = Ember.Route.extend({
  model: function() {
    return App.Page.find();
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('pages');
  }
});

// TODO: Add redirect to first page in pages array




// MODELS

App.Page = Ember.Model.extend({
  id: Ember.attr(),
  sheetId: Ember.attr(),
  name: function() {
    return this.get('id')
  }.property('id')
});

// App.Page.adapter = Ember.FixtureAdapter.create();

// App.Page.FIXTURES = [
//   {id: 'home', spreadsheetId: 'od6'},
//   {id: 'about', spreadsheetId: 'od7'},
//   {id: 'contact', spreadsheetId: 'od8'}
// ];

App.Page.adapter = Ember.Adapter.create({

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

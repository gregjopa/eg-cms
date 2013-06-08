window.App = Ember.Application.create({
  spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
  spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds'
});


require('app/scripts/vendor/*');
require('app/scripts/routes/*');
require('app/scripts/controllers/*');
require('app/scripts/models/*');
require('app/scripts/helpers/*');
// require('app/scripts/views/*');


// dynamically create routes and nav from api call
App.deferReadiness();

App.nav = App.NavItem.findAll();

App.nav.one('didLoad', function() {
  App.createRoutes(App.nav);
  App.advanceReadiness();
});

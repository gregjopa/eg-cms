window.App = Ember.Application.create({
  spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
  spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds',
  // a 'global sheet' contains data thats displayed on many pages (ex: site name, footer text, sidebar)
  globalSheets: ['config', 'social icons'],
  animationType: 'fade'
});


require('app/scripts/vendor/*');
require('app/scripts/routes/*');
require('app/scripts/controllers/*');
require('app/scripts/models/*');
require('app/scripts/views/*');
require('app/scripts/helpers/*');
require('app/scripts/mixins/*');

// uncomment this line to use fixture data
// require('app/scripts/models/fixtures/*');


// dynamically create routes and nav from api call
App.deferReadiness();

App.nav = App.NavItem.findAll();

App.nav.one('didLoad', function() {
  var globalSheetIds = [];
  var navItems = App.nav.filter(function(item, index) {

    if (App.globalSheets.contains(item.get('name'))) {
      globalSheetIds.push(item.get('id'));
      return false;
    }
    else {
      return true;
    }

  });

  App.createApplicationRoute(navItems, globalSheetIds);
  App.createPageRoutes(navItems);
  App.advanceReadiness();
});

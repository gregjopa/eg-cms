window.App = Ember.Application.create({
  spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
  spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds',
  // a 'global page' contains data thats displayed on many pages (ex: site name, footer text, sidebar)
  globalPages: ['config', 'social_icons']
});


require('app/scripts/vendor/*');
require('app/scripts/routes/*');
require('app/scripts/controllers/*');
require('app/scripts/models/*');
require('app/scripts/views/*');
require('app/scripts/helpers/*');
require('app/scripts/mixins/*');



// dynamically create routes and nav from api call
App.deferReadiness();

App.nav = App.NavItem.findAll();

App.nav.one('didLoad', function() {
  var globalPageIds = [];
  var navItems = App.nav.filter(function(item, index) {

    if (App.globalPages.contains(item.get('name'))) {
      globalPageIds.push(item.get('id'));
      return false;
    }
    else {
      return true;
    }

  });

  App.createApplicationRoute(navItems, globalPageIds);
  App.createPageRoutes(navItems);
  App.advanceReadiness();
});

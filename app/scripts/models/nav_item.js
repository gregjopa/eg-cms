App.NavItem = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr()
});

App.NavItem.adapter = Ember.Adapter.create({

  findAll: function(klass, records) {
    $.getJSON(App.spreadsheetRootUrl + '/worksheets/' + App.spreadsheetKey + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        var pages = [];
        response.feed.entry.forEach(function (entry) {
          // parse out the sheet id
          var sheetId = entry.id.$t.substring(entry.id.$t.lastIndexOf('/') + 1);
          var page = {
            id: sheetId,
            name: entry.title.$t
          };
          pages.push(page);
        });
       records.load(klass, pages);
    });
  }

});

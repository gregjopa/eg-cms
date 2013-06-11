App.Page = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  fields: Ember.attr()
});

App.Page.adapter = Ember.Adapter.create({

  find: function(record, id) {
    $.getJSON(App.spreadsheetRootUrl + '/list/' + App.spreadsheetKey + '/' + id + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        var page = App.spreadsheetParser.parse(id, response.feed);
        record.load(id, page);
    });
  },

  findMany: function(klass, records, ids) {
    var globalPages = [];

    var deferredArr = $.map(ids, function(id, index) {
      return $.getJSON(App.spreadsheetRootUrl + '/list/' + App.spreadsheetKey + '/' + id + '/public/values?alt=json-in-script&callback=?')
        .then(function(response) {
          var page = App.spreadsheetParser.parse(id, response.feed);
          globalPages.push(page);
      });
    });


    $.when.apply(null, deferredArr).done(function() {
      records.load(klass, globalPages);
    });

  }

});

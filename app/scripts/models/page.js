App.Page = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  fields: Ember.attr()
});

// App.Page.adapter = Ember.FixtureAdapter.create();

// App.Page.FIXTURES = [
//   {id: 'od6', name: 'home', fields: {test1: 'testaaa data', test2: 'test1 data'}},
//   {id: 'od7', name: 'about', fields: {test1: 'testb data', test2: 'test2 data'}},
//   {id: 'od8', name: 'contact', fields: {test1: 'testc data', test2: 'test3 data'}}
// ];

App.Page.adapter = Ember.Adapter.create({

  find: function(record, id) {
    $.getJSON(App.spreadsheetRootUrl + '/list/' + App.spreadsheetKey + '/' + id + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        var page = {
          id: id,
          name: response.feed.title.$t,
          fields: response.feed.entry[0]
        };

        record.load(id, page);
    });
  }

});

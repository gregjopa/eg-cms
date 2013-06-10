App.spreadsheetParser = Ember.Object.create({

  parse: function(id, feed) {

    if (feed.entry.length > 1) {
      return this.list(id, feed);
    }
    else {
      return this.singleRow(id, feed);
    }

  },


  singleRow: function(id, feed) {
    var page = {
      id: id,
      name: feed.title.$t,
      fields: feed.entry[0]
    };

    return page;
  },


  list: function(id, feed) {
    var fields = [];
    feed.entry.forEach(function(entry, index) {
      fields.push(entry);
    });

    var page = {
      id: id,
      name: feed.title.$t,
      fields: fields
    };

    return page;

  },

  // TODO: add method to remove 'gsx$' from google spreadsheet field names
  renameFields: function(fields) {

  }

});

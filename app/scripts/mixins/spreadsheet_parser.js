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
      fields: this.renameFields(feed.entry[0])
    };
    return page;
  },


  list: function(id, feed) {
    var fields = [];
    var self = this;
    feed.entry.forEach(function(entry, index) {
      fields.push(self.renameFields(entry));
    });

    var page = {
      id: id,
      name: feed.title.$t,
      fields: fields
    };

    return page;
  },


  // remove 'gsx$' from google spreadsheet field names
  renameFields: function(fields) {
    var formattedFields = {};
    var keys = Object.keys(fields);
    keys.forEach(function(key, index) {
      var fieldIndicator = 'gsx$';
      if (key.indexOf(fieldIndicator) !== -1) {
        // remove 'gsx$' from property name and convert to camel case
        var formattedKey = key.replace(fieldIndicator, '').camelize();
        formattedFields[formattedKey] = fields[key].$t;
      }
    });
    return formattedFields;
  }

});

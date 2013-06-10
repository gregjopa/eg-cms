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
          console.log(page);
      });
    });


    $.when.apply(null, deferredArr).done(function() {
      records.load(klass, globalPages);
    });

  }

});


// App.Page.adapter = Ember.FixtureAdapter.create();

// App.Page.FIXTURES = [
//   {
//     id: 'oda',
//     name: 'config',
//     fields: {
//       'gsx$sitename': {
//         '$t': "EG-CMS"
//       },
//       'gsx$sitetagline': {
//         '$t': "a fun and easy to use cms"
//       },
//       'gsx$footertext': {
//         '$t': "Copyright 2013 EG-CMS"
//       }
//     }
//   },
//   {
//     id: 'odb',
//     name: 'social_icons',
//     fields: {
//       'gsx$paragraph': {
//         '$t': "TODO: Add list of social links"
//       }
//     }
//   },
//   {
//     id: 'od6',
//     name: 'home',
//     fields: [
//       {
//         'gsx$paragraph': {
//           '$t': "EG-CMS uses a google spreadsheet to manage website content. It's built in javascript using ember.js."
//         }
//       },
//       {
//         'gsx$paragraph': {
//           '$t': "The Google Spreadsheets API provides two main types of api calls for querying content from a spreadsheet."
//         }
//       }
//     ]
//   },
//   {
//     id: 'od7',
//     name: 'about',
//     fields: {
//       'gsx$paragraph': {
//         '$t': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//       }
//     }
//   },
//   {
//     id: 'od4',
//     name: 'contact',
//     fields: {
//       'gsx$paragraph': {
//         '$t': "Email me with any questions you have about eg-cms."
//       },
//       'gsx$email': {
//         '$t': "grjopa@gmail.com"
//       }
//     }
//   }
// ];

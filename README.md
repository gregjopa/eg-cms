# eg-cms

A simple cms built with Ember.js and backed by a Google Spreadsheet as the datastore.


## Demo Spreadsheet

The following Google Drive spreadsheet is public and has been published to the web:
https://docs.google.com/spreadsheet/pub?key=0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc&gid=0

Each sheet in this spreadsheet is for a single page in the cms.


## Google Spreadsheets API

Documentation: https://developers.google.com/google-apps/spreadsheets/

The following two HTTP GET requests are used to query data from a public google spreadsheet:

1. Worksheet Feed - provides all sheet names and ids

  ```javascript
    var spreadsheetKey = '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc';
    $.getJSON('https://spreadsheets.google.com/feeds/worksheets/' + spreadsheetKey + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        console.log('all data', response);
        // returns an array of sheet names and ids
        console.log('relevant data', response.feed.entry);
      }
    );
  ```

2. List Feed - provides data for a specific sheet in the worksheet. The spreadsheets api assumes the first row
 in each sheet contains column names.

  ```javascript
    var spreadsheetKey = '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc';
    $.getJSON('https://spreadsheets.google.com/feeds/list/' + spreadsheetKey + '/1/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        console.log('all data', response);
        // returns an array of data for each row in the sheet
        console.log('relevant data', response.feed.entry);
      }
    );
  ```

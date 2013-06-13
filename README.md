# EG-CMS

A flexible and easy to use cms. This library is built with Ember.js and uses a Google Spreadsheet
for storing all site content. You can easily host a EG-CMS website since it's just html, css, and
javascript. No database or server-side code required.


## Demo Spreadsheet

The following Google Drive spreadsheet is used for the demo site:
https://docs.google.com/spreadsheet/pub?key=0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc&gid=0

A Google Spreadsheet must be public and published to the web to be used with EG-CMS.


## Regular Sheets vs Global Sheets

Each regular sheet in the spreadsheet is for a single page in the cms. However, sometimes you will
require the same information to be displayed on multiple pages (ex: site name, footer text, sidebar).
For this scenario, a global sheet should be used. These global sheets are listed in the
"globalSheets" array. Data for each global sheet is stored in the Application Controller.

```javascript
  // define global sheets on app creation
  window.App = Ember.Application.create({
    spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
    spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds',
    globalSheets: ['config', 'social icons']
  });
```


## Naming Conventions

### Column Names

Column names in the spreadsheet must be lowercase and must use a dash (-) to separate words
(ex: site-name, footer-text). Spaces, underscores, and capital letters are NOT supported in column names.

Unfortunately, the Google Spreadsheets API 'feeds' request type doesn't return the exact column names.
Instead, it formats the column names automatically by striping out any spaces and underscores and
converting all letters to lowercase. The Google Spreadsheets API 'cells' request type returns the actual
column names but that would require an additional api call for every sheet, which just isn't worth it.
So underscores and capital letters can not be used in your column names. Instead, use dashes.

- Good Column Name: site-name
- Bad Column Names: site_name, siteName, site name

### Sheet Names

Sheet names can include capital letters, spaces, and underscores. The only restriction is special
characters cannot be used in sheet names.

- Good Sheet Names: Home, Social Icons, Contact Us
- Bad Sheet Names: Home#, @Contact Us, Order's


## Sheet Types

Spreadsheets can contain multiple sheets for categorizing information. There are 2 different ways
to model data in a sheet:

1. Single Row

  <table>
    <tr>
      <th>site-name</th>
      <th>site-tagline</th>
      <th>footer-text</th>
    </tr>

    <tr>
      <td>EG-CMS</td>
      <td>a flexible and easy to use cms</td>
      <td>Copyright 2013 EG-CMS</td>
    </tr>
  </table>

  ```javascript
    {
      id: 'oda',
      name: 'config',
      fields: {
        siteName: 'EG-CMS',
        siteTagline: 'a flexible and easy to use cms',
        footerText: 'Copyright 2013 EG-CMS'
      }
    }
  ```

2. List

  <table>
    <tr>
      <th>name</th>
      <th>link</th>
      <th>icon-css-class</th>
    </tr>

    <tr>
      <td>GitHub</td>
      <td>https://github.com/emberjs/ember.js</td>
      <td>github</td>
    </tr>

    <tr>
      <td>Twitter</td>
      <td>https://twitter.com/emberjs</td>
      <td>twitter</td>
    </tr>

    <tr>
      <td>Google Plus</td>
      <td>https://plus.google.com/communities/106387049790387471205</td>
      <td>google-plus</td>
    </tr>

  </table>

  ```javascript
    {
      id: 'odb',
      name: 'social icons',
      fields: [
        {
          name: 'GitHub',
          link: 'https://github.com/emberjs/ember.js',
          iconCssClass: 'github'
        },
        {
          name: 'Twitter',
          link: 'https://twitter.com/emberjs',
          iconCssClass: 'twitter'
        },
        {
          name: 'Google Plus',
          link: 'https://plus.google.com/communities/106387049790387471205',
          iconCssClass: 'google-plus'
        }
      ]
    }
  ```


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


## Configure Development Environment

1. clone this repo: `git clone https://github.com/gregjopa/eg-cms.git`
2. change directory: `cd eg-cms`
3. install node dependencies: `npm install`
4. install bower dependencies: `bower install`
5. start your local dev server: `grunt server --force`

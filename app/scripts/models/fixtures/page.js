App.Page.adapter = Ember.FixtureAdapter.create();

App.Page.FIXTURES = [
  {
    id: 'oda',
    name: 'config',
    fields: {
      sitename: 'EG-CMS',
      sitetagline: 'a fun and easy to use cms',
      footertext: 'Copyright 2013 EG-CMS'
    }
  },
  {
    id: 'odb',
    name: 'social_icons',
    fields: {
      paragraph: 'TODO: Add list of social links'
    }
  },
  {
    id: 'od6',
    name: 'home',
    fields: [
      {
        paragraph: "EG-CMS uses a google spreadsheet to manage website content. It's built in javascript using ember.js."
      },
      {
        paragraph: 'The Google Spreadsheets API provides two main types of api calls for querying content from a spreadsheet.'
      }
    ]
  },
  {
    id: 'od7',
    name: 'about',
    fields: {
      paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  },
  {
    id: 'od4',
    name: 'contact',
    fields: {
      paragraph: 'Email me with any questions you have about eg-cms.',
      email: 'grjopa@gmail.com'
    }
  }
];

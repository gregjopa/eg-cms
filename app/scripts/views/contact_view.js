App.ContactView = Ember.View.extend({
  templateName: 'contact',
  mailto: function() {
    return 'mailto:' + this.controller.get('fields.gsx$email.$t');
  }.property('controller.email')
});

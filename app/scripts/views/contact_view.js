App.ContactView = Ember.View.extend({
  templateName: 'contact',
  mailto: function() {
    return 'mailto:' + this.controller.get('fields.email');
  }.property('controller.fields.email')
});

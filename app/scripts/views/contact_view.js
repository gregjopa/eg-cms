App.ContactView = Ember.View.extend({
  templateName: 'contact',
  mailto: function() {
    console.log(this.controller.get('fields.email'));
    return 'mailto:' + this.controller.get('fields.email');
  }.property('controller.fields.email')
});

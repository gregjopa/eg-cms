App.HomeView = Ember.View.extend({
  templateName: 'home',
  paragraphs: function() {
    var paragraphs = [];

    if (this.controller.get('fields')) {
      var fields = this.controller.get('fields');
      fields.forEach(function(field, index) {
        // only return fields with an actual value
        if (field.paragraph) {
          paragraphs.push(field);
        }
      });
    }

    return paragraphs;
  }.property('controller.fields')
});

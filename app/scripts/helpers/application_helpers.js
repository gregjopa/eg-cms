// linkToPage helper accepts a variable for the route name
// ex: {{#each model}} <li>{{#linkToPage name this}} {{name}} {{/linkToPage}}</li> {{/each}}
// helper code adapted from: http://stackoverflow.com/questions/15216356/how-to-make-linkto-dynamic-in-ember

Ember.Handlebars.registerHelper('linkToPageAnimated', function(name) {
  var routeName = Ember.Handlebars.get(this, name);
  var options = [].slice.call(arguments, 2);
  options.unshift(routeName);
  options[1].hash = {animations: 'main:' + App.animationType};
  return Ember.Handlebars.helpers.linkToAnimated.apply(this, options);
});

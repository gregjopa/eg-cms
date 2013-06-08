// linkToPage helper accepts a variable for the route name
// ex: {{#each model}} <li>{{#linkToPage name this}} {{name}} {{/linkToPage}}</li> {{/each}}
// helper code adapted from: http://stackoverflow.com/questions/15216356/how-to-make-linkto-dynamic-in-ember

Ember.Handlebars.registerHelper('linkToPage', function(name) {
  var routeName = Ember.Handlebars.get(this, name);
  arguments = [].slice.call(arguments, 2);
  arguments.unshift(routeName);
  return Ember.Handlebars.helpers.linkTo.apply(this, arguments);
});

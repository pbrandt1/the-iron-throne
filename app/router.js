var Router = Ember.Router.extend({

}); // ensure we don't share routes between all Router instances

Router.map(function () {
  this.route('action');
  this.route('challenge');
  this.route('block');
  this.route('gg');
  this.route('wait', {path: '/wait/:time'});
  // this.resource('posts', function() {
  //   this.route('new');
  // });
});

export default
Router;

export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('time', model.time);
  }
});

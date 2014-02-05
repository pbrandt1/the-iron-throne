export default Ember.ObjectController.extend({
  needs: 'application',
  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  participants: Ember.computed.alias('controllers.application.participants'),
  actions: {
    feedClock: function() {
      // send update to gapi

      // update my clock
    }
  }
});

export default Ember.ObjectController.extend({
  needs: 'application',
  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  participants: Ember.computed.alias('controllers.application.participants'),

  timeleft: 0,

  actions: {
    chooseAction: function(action) {
      // send updates over wire

      // update ui

    },
    feedClock: function() {
      // send update to gapi

      // update my clock
    }
  }
});

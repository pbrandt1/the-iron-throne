import CONSTANTS from 'appkit/models/constants';

export default Ember.ObjectController.extend({
  needs: 'application',
  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  participants: Ember.computed.alias('controllers.application.participants'),
  me: Ember.computed.alias('controllers.application.me'),
  OMGITSMYTURN: function() {
    // really it's only your turn
    return this.get('me') && this.get('sharedState.currentPlayer')
      && this.get('me').toString() === this.get('sharedState.currentPlayer').toString();
  }.property('me', 'sharedState.currentPlayer', 'sharedState.phase', 'sharedState.state'),

  enableCountdown: function() {
    return this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt;
  }.property('sharedState.state'),


  timeleft: 5,

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

import CONSTANTS from 'appkit/models/constants';

export default Ember.ObjectController.extend({
  needs: 'application',
  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  participants: Ember.computed.alias('controllers.application.participants'),
  me: Ember.computed.alias('controllers.application.me'),
  OMGITSMYTURN: function() {
    // really it's only your turn
    return this.get('me') && this.get('sharedState.currentPlayer')
      && this.get('me').toString() === this.get('sharedState.currentPlayer').toString()
      && this.get('sharedState.state') === CONSTANTS.STATE.ChoosingAction
      && this.get('sharedState.phase') === CONSTANTS.PHASE.Action;
  }.property('me', 'sharedState.currentPlayer', 'sharedState.phase', 'sharedState.state'),

  enableCountdown: function() {
    return this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt;
  }.property('sharedState.state'),


  timeleft: 5,

  actions: {
    chooseAction: function(actionKey) {
      if (this.get('OMGITSMYTURN')) {
        this.set('sharedState.state', CONSTANTS.STATE.WaitingForInterrupt);
        this.set('sharedState.phase', CONSTANTS.PHASE.ActionChallenge);
        this.set('sharedState.action.playerId', this.get('me.id'));
        this.set('sharedState.action.action', CONSTANTS.ACTIONS[actionKey]);
      } else {
        console.log('attempted to set an action when you just can\'t.');
      }
    },
    chooseBlock: function(blockKey) {
      if (!this.get('OMGITSMYTURN')
        && this.get('sharedState.phase') === CONSTANTS.PHASE.Block
        && this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt) {
        this.set('sharedState.state', CONSTANTS.STATE.EffectSummary);
        this.set('counterAction.playerId', this.get('me.id'));
        this.set('counterAction.counterAction', CONSTANTS.COUNTERACTIONS[blockKey]);
      } else {
        console.log('attempted to set an action when you just can\'t.');
      }

    },
    feedClock: function() {
      // send update to gapi

      // update my clock
    }
  }
});

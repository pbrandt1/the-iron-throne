import CONSTANTS from 'appkit/models/constants';

export default Ember.ObjectController.extend({
  needs: 'application',
  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  participants: Ember.computed.alias('controllers.application.participants'),
  me: Ember.computed.alias('controllers.application.me'),

	/**
	 * Gets the full current player
	 */
	currentPlayer: function() {
		return this.get('participants').findBy('id', this.get('sharedState.currentPlayer'));
	}.property('sharedState.currentPlayer'),

	/**
	 * It's my round, whether it's the action phase, block phase or whatever, everything revolves around ME!
	 */
	itsMyRound: function() {
		return this.get('me.id') === this.get('sharedState.currentPlayer');
	}.property('sharedState.currentPlayer', 'me'),

	/**
	 * It's my turn AND I GET TO PICK AN ACTION!!!!
	 */
  OMGITSMYTURN: function() {
    // really it's only your turn, so calm down. geez.
    return this.get('itsMyRound') &&
			this.get('sharedState.state') === CONSTANTS.STATE.ChoosingAction &&
			this.get('sharedState.phase') === CONSTANTS.PHASE.Action;
  }.property('itsMyRound', 'sharedState.phase', 'sharedState.state'),

	/**
	 * Something has triggered the countdown timer
	 *  - I must choose an action
	 *  - There is an opportunity to challenge someone
	 *  - There is an opportunity to block an action
	 */
  enableCountdown: function() {
    return this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt;
  }.property('sharedState.state'),

	/**
	 * Time left on the countdown timer in seconds
	 */
  timeleft: 5,

	/**
	 * Peeps gotta know what's up in the game
	 */
	actionText: function() {
		if (this.get('sharedState.phase') > CONSTANTS.PHASE.Action) {
			var text = [];
			if (this.get('me.id') === this.get('currentPlayer.id')) {
				text.push('You');
			} else {
				text.push(this.get('currentPlayer.person.displayName'));
			}
			text.push(' chose the action ');
			text.push(this.get('sharedState.action.action.display'));
			text.push('.');
			return text.join('');
		} else {
			return false;
		}
	}.property('sharedState.action', 'sharedState.phase'),

	blockText: function() {
		if (this.get('sharedState.phase') > CONSTANTS.PHASE.Block) {
			var text = [];
			if (this.get('me.id') === this.get('currentPlayer.id')) {
				text.push('You');
			} else {
				text.push(this.get('currentPlayer.person.displayName'));
			}
			text.push(' chose the action ');
			text.push(this.get('sharedState.block.block.display').toString());
			text.push('.');
			return text.join('');
		} else {
			return false;
		}
	}.property('sharedState.block', 'sharedState.phase'),

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
      if (this.get('sharedState.currentPlayer') === this.get('me.id') &&
				this.get('sharedState.phase') === CONSTANTS.PHASE.Block &&
				this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt) {

        this.set('sharedState.state', CONSTANTS.STATE.EffectSummary);
        this.set('block.playerId', this.get('me.id'));
        this.set('block.block', CONSTANTS.BLOCKS[blockKey]);
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

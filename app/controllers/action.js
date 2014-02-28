/**
 * WHen this route is rendered, it is your turn and you are choosing an action
 */

import CONSTANTS from 'appkit/models/constants';

export default Ember.ObjectController.extend({
  needs: ['application'],

  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  me: Ember.computed.alias('controllers.application.me'),

  time: 30,

  actions: {
    chooseAction: function (actionKey) {
      this.set('sharedState.state', CONSTANTS.STATE.WaitingForInterrupt);
      this.set('sharedState.phase', CONSTANTS.PHASE.ActionChallenge);
      this.set('sharedState.action.playerId', this.get('me.id'));
      this.set('sharedState.action.action', CONSTANTS.ACTIONS[actionKey]);

      this.transitionToRoute('wait', {time: 10});
    },
		onTimeEnd: function() {
			// You blew it!  A role is randomly discarded and you lose your turn

		}
  }

});

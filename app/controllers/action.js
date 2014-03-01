/**
 * When this route is rendered, it is your turn and you are choosing an action
 */

import CONSTANTS from 'appkit/models/constants';
import kill from 'appkit/mixins/kill';
import SharedStateMixin from 'appkit/mixins/shared-state';

export default Ember.ObjectController.extend(kill, SharedStateMixin, {
  needs: ['application'],
  me: Ember.computed.alias('controllers.application.me'),

  time: 30,

  actions: {
    chooseAction: function (actionKey) {
      this.setProperties({
				'sharedState.state': CONSTANTS.STATE.WaitingForInterrupt,
				'sharedState.phase': CONSTANTS.PHASE.ActionChallenge,
				'sharedState.action.playerId': this.get('me.id'),
				'sharedState.action.action': CONSTANTS.ACTIONS[actionKey]
			});

      this.transitionToRoute('wait', {time: 10});
    },
		onTimeEnd: function() {
			// You blew it!  You lose a role and your turn ends
			this.kill(me);
		}
  }

});

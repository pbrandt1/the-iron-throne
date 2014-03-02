/**
 * This file observes the state, phase, and current user and navigates
 * to the appropriate route accordingly.
 */

export default Ember.Mixin.create({
	navigate: function() {
		
	}.observes('sharedState.state', 'sharedState.phase', 'sharedState.currentPlayer')
});

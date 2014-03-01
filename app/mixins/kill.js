/**
 * This mixin kills a players role.
 */

export default Ember.Mixin.create({
	kill: function(playerId) {
		var crads = this.get('sharedState.cards.' + playerId);
		crads.splice(0,1);
		this.set('sharedState.cards.' + playerId, crads);

	}
});

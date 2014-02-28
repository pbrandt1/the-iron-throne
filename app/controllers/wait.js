export default Ember.ObjectController.extend({
  /**
   * This is the starting time on the clock when it begins to count down
   */
  time: null,

  /**
   * This is the player that you're waiting on
   */
  player: null,

  /**
   * This is the text that tells you what's going on
   */
  text: function() {
    if (this.get('player')) {
      return 'Waiting on ' + this.get('player.person.displayName');
    } else {
      return 'Waiting on everybody else to determine your fate';
    }
  }.property('player'),

	actions: {
		/**
		 * This is what happens when the clock hits zero
		 */
		onTimeEnd: function() {

		}
	}

});

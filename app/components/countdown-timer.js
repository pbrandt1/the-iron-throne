/**
 * Countdown timer
 * time: time left on the clock.  This is auto-incremented inexorably downward
 * visible: true/false
 */

export default Ember.Component.extend({
	interval: null,
	isTicking: function() {
		return this.get('time') > 0 && !!this.get('interval');
	}.property('time', 'interval'),

	tick: function() {
		var _ = this;

		if (this.get('isTicking')) {
			// if the clock is ticking, let it tick
		} else if (this.get('time') > 0) {
			// if the clock is not ticking, but should be, then start it
			var interval = setInterval(function() {
				_.decrementProperty('time');
			}, 1000);
			this.set('interval', interval);
		} else {
			// The clock hit zero!
			// kill the interval
			clearInterval(this.get('interval'));
			this.set('interval', null);
		}
	}.observes('time')



});

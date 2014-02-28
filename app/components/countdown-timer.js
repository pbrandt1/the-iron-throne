/**
 * Countdown timer
 * time: time left on the clock.  This is auto-incremented inexorably downward
 * visible: true/false
 */

export default
Ember.Component.extend({

  tick: function () {
    var _ = this;
    
    if (this.get('time') > 0) {
      // if the clock is not ticking, but should be, then start it
      Ember.run.later(this, function () {
        this.decrementProperty('time');
      }, 1000);
    } else {
      // The clock hit zero!\
			this.sendAction('onTimeEnd');
    }
  }.observes('time'),

  didInsertElement: function() {
    this.tick();
  }



});

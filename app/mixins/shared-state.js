import SharedState from 'appkit/models/sharedState';

/**
 * Mixin which automagically communicates with gapi
 * Note that mixin properties are shared globally, so if the application controller
 * modifies _sharedState, the action controller will get that update.
 */

var SharedStateMixin = Ember.Mixin.create({
	/**
	 * The shared state
	 */
	sharedState: SharedState.create(),

	/**
	 * Override the setter, but only send updates to sharedState over the wire
	 */
	set: function(key, value, doNotSend) {
		if (!doNotSend && key.indexOf('sharedState.') > -1) {
			var obj = {};
			obj[key] = value;
			this.setProperties(obj, doNotSend);
		}

		this._super(key, value);
	},

	/**
	 * Also override setProperties.  only send the updates to sharedState over the wire
	 */
	setProperties: function(obj, doNotSend) {
		if (!doNotSend) {
			var sharedState = {};
			for (var k in obj) {
				if (k.indexOf('sharedState.') > -1) {
					sharedState[k.replace('sharedState.', '')] = JSON.stringify(obj[k]);
				}
			}
			if (sharedState.length > 0) {
				gapi.hangout.submitDelta(sharedState);
			}
		}

		this._super(obj);
	},

	/**
	 * Set up listener for gapi shared state data
	 */
	init: function() {
		var me = this;
		/**
		 * Handle shared-state changes.  Shared state is everything in the Game model, including players.
		 */
		gapi.hangout.data.onStateChanged.add(function (event) {
			var obj = {};

			// Null out removed keys
			event.removedKeys.forEach(function (key) {
				obj['sharedState.' + key] = null;
			});

			// Update these keys, which are sent over in JSON.stringify() format
			event.addedKeys.forEach(function (key) {
				obj['sharedState.' + key.key] = JSON.parse(key.value);
			});

			me.setProperties(obj, true);
		});
	}

});


export default SharedStateMixin;

import SharedState from 'appkit/models/sharedState';
import Participant from 'appkit/models/participant';
import CONSTANTS from 'appkit/models/constants';

export default Ember.ObjectController.extend({
  sharedState: SharedState.create({}),
  participants: [],
  canStartGame: function() {
    return this.get('sharedState').state === CONSTANTS.STATE.NotStarted && this.get('participants').length > 1;
  }.property('sharedState', 'particiapants'),
  isStarted: function() {
    return this.get('sharedState').state > CONSTANTS.STATE.NotStarted;
  }.property('sharedState'),

  /**
   * Set up listeners with gapi
   */
  init: function() {
    var _ = this;

    /**
     * Init the participants
     */
    gapi.hangout.getEnabledParticipants().forEach(function(p) {
      _.participants.pushObject(Participant.create(p));
    });

    /**
     * Handle shared-state changes.  Shared state is everything in the Game model, including players.
     */
    gapi.hangout.data.onStateChanged.add(function(event) {
      // As each key of the state hashed is presented, simply update the model accordingly.
      // For complex properties like players, you have to JSON.parse it and set it that way.
      event.addedKeys.forEach(function(key){
        var value = typeof _.sharedState[key.key] === 'string' ? key.value : JSON.parse(key.value);
        _.sharedState.set(key.key, value);
      });

      // I don't think i'm going to have to deal with removed keys
      event.removedKeys.forEach(function(key) {
        // so coool
      });
    });

    /**
     * Add players when a participant opens the app
     */
    gapi.hangout.onParticipantsEnabled.add(function(event) {

      // Always add new players with zero roles so that they do not affect current gameplay, but can join next round
      event.participants && event.participants.forEach(function(p) {
        if (!_.participants.findBy('person.id', p.person.id)) {
          _.participants.pushObject(Participant.create(p));
        }
      });
    });

    /**
     * Remove players when a participant disables the app
     */
    gapi.hangout.onParticipantsDisabled.add(function(event) {
      event.participants && event.participants.forEach(function(p) {
        var participant = _.participants.findBy('person.id', p.person.id);
        _.participants.popObject(participant);
      });
    });
  }
});

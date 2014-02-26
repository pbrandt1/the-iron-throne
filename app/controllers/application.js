import
SharedState
from
'appkit/models/sharedState';
import
Participant
from
'appkit/models/participant';
import
CONSTANTS
from
'appkit/models/constants';

export default
Ember.ObjectController.extend({

  debugging: false,

  sharedState: SharedState.create({}),
  participants: [],
  me: null,

  canStartGame: function () {
    return this.get('sharedState').state === CONSTANTS.STATE.NotStarted && this.get('participants').length > 1;
  }.property('sharedState', 'participants'),

  isStarted: function () {
    return this.get('sharedState.state') > CONSTANTS.STATE.NotStarted;
  }.property('sharedState.state'),

  /**
   * Stats for this participant, always on-screen
   */
  myCoins: function () {
    var id = this.get('me.id');
    return this.get('sharedState.coins')[id] || 0;
  }.property('sharedState.coins'),

  myRoles: function () {
    var cards = this.get('sharedState.cards')[this.get('me.id')];

    if (cards) {
      return cards.map(function (c) {
        return { name: CONSTANTS.ROLE_INVERSE[c] };
      });
    }
    return [];
  }.property('sharedState.cards').cacheable(),



  /**
   * Set up listeners with gapi
   */
  init: function () {
    var _ = this;
    /**
     * Handle shared-state changes.  Shared state is everything in the Game model, including players.
     */
    gapi.hangout.data.onStateChanged.add(function (event) {
      // As each key of the state hashed is presented, simply update the model accordingly.
      // For complex properties like players, you have to JSON.parse it and set it that way.
      event.addedKeys.forEach(function (key) {
        _.sharedState.set(key.key, JSON.parse(key.value));
      });

      // I don't think i'm going to have to deal with removed keys
      event.removedKeys.forEach(function (key) {
        // so coool
      });
    });
    /**
     * Init the participants
     */
    gapi.hangout.getEnabledParticipants().forEach(function (p) {
      _.participants.pushObject(Participant.create(p));
    });

    // Consider maintaining a list of all participants and then just flag if they are in the game?
    //gapi.hangout.getParticipants().forEach(function(p) {
    //	if (!_.participants.findBy('person.id', p.person.id)) {
    //		_.participants.pushObject(Participant.create(p));
    //	}
    //});

    /**
     * Add players when a participant opens the app
     */
    gapi.hangout.onParticipantsEnabled.add(function (event) {
      // Always add new players with zero roles so that they do not affect current gameplay, but can join next round
      event.enabledParticipants && event.enabledParticipants.forEach(function (p) {
        if (!_.participants.findBy('person.id', p.person.id)) {
          _.participants.pushObject(Participant.create(p));
        }
      });
    });

    /**
     * Remove players when a participant disables the app
     */
    gapi.hangout.onParticipantsDisabled.add(function (event) {
      event.disabledParticipants && event.disabledParticipants.forEach(function (p) {
        var participant = _.participants.findBy('person.id', p.person.id);
        _.participants.popObject(participant);
      });
    });

    //set me to hangout user
    _.set('me', gapi.hangout.getLocalParticipant());

  }
});

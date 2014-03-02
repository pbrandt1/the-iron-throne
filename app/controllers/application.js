import Participant from 'appkit/models/participant';
import CONSTANTS from 'appkit/models/constants';
import SharedStateMixin from 'appkit/mixins/shared-state';
import NavigationMixin from 'appkit/mixins/navigation';

export default
Ember.ObjectController.extend(SharedStateMixin, NavigationMixin, {

  debugging: false,

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
   * Set up listeners with gapi for participants
   */
  init: function () {
    var _ = this;
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

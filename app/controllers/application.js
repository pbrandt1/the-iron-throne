import SharedState from 'appkit/models/sharedState';
import Participant from 'appkit/models/participant';
import CONSTANTS from 'appkit/models/constants';

export default Ember.ObjectController.extend({

  debugging: true,

  sharedState: SharedState.create({}),
  participants: [],
  me: null,

  canStartGame: function() {
    return this.get('sharedState').state === CONSTANTS.STATE.NotStarted && this.get('participants').length > 1;
  }.property('sharedState', 'participants'),

  isStarted: function() {
    return this.get('sharedState.state') > CONSTANTS.STATE.NotStarted;
  }.property('sharedState.state'),

  /**
   * Stats for this participant, always on-screen
   */
  myCoins: function() {
    var id = this.get('me.id');
    return this.get('sharedState.coins')[id] || 0;
  }.property('sharedState.coins'),

  myRoles: function() {
    var cards = this.get('sharedState.cards')[this.get('me.id')];

    if (cards) {
      return cards.map(function(c) {
        return { name: CONSTANTS.ROLE_INVERSE[c] };
      });
    }
    return [];
  }.property('sharedState.cards').cacheable(),

  actions: {
    start: function() {

      var tempCoins = {};
      var tempCards = {};
      var tempTurns = [];
      var deck = [];
      for (var i = 0; i < 15; i++) {
        deck.push(i%5);
      }

      this.get('participants').forEach(function(p) {
        // each player gets three coins
        tempCoins[p.id] = 3;

        // each player gets two cards
        tempCards[p.id] = [];
        tempCards[p.id].push(deck.splice(Math.random()*deck.length|0, 1)[0]);
        tempCards[p.id].push(deck.splice(Math.random()*deck.length|0, 1)[0]);

        // each player gets a turn!  (maybe)
        tempTurns.push(p.id);
      });

      // the rest of the cards stay in the deck
      tempCards.deck = deck;

      this.set('sharedState.coins', tempCoins);
      this.set('sharedState.cards', tempCards);
			this.set('sharedState.state', CONSTANTS.STATE.ChoosingAction);
			this.set('sharedState.phase', CONSTANTS.PHASE.Action);
			this.set('sharedState.turnOrder', tempTurns);
      this.set('sharedState.currentPlayer', this.get('me.id'));

			/**
			 * All values must be strings (watch out for numbers, they'll get you!!)
			 */
      gapi.hangout.data.submitDelta({
        coins: JSON.stringify(tempCoins),
        cards: JSON.stringify(tempCards),
        state: JSON.stringify(this.get('sharedState.state')),
				phase: JSON.stringify(this.get('sharedState.phase')),
        turnOrder: JSON.stringify(tempTurns),
        currentPlayer: JSON.stringify(this.get('me.id'))
      });
    }
  },



  /**
   * Set up listeners with gapi
   */
  init: function() {
    var _ = this;
    /**
     * Handle shared-state changes.  Shared state is everything in the Game model, including players.
     */
    gapi.hangout.data.onStateChanged.add(function(event) {
      // As each key of the state hashed is presented, simply update the model accordingly.
      // For complex properties like players, you have to JSON.parse it and set it that way.
      event.addedKeys.forEach(function(key){
        _.sharedState.set(key.key, JSON.parse(key.value));
      });

      // I don't think i'm going to have to deal with removed keys
      event.removedKeys.forEach(function(key) {
        // so coool
      });
    });
    /**
     * Init the participants
     */
    gapi.hangout.getEnabledParticipants().forEach(function(p) {
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
    gapi.hangout.onParticipantsEnabled.add(function(event) {
      // Always add new players with zero roles so that they do not affect current gameplay, but can join next round
      event.enabledParticipants && event.enabledParticipants.forEach(function(p) {
        if (!_.participants.findBy('person.id', p.person.id)) {
          _.participants.pushObject(Participant.create(p));
        }
      });
    });

    /**
     * Remove players when a participant disables the app
     */
    gapi.hangout.onParticipantsDisabled.add(function(event) {
      event.disabledParticipants && event.disabledParticipants.forEach(function(p) {
        var participant = _.participants.findBy('person.id', p.person.id);
        _.participants.popObject(participant);
      });
    });

    //set me to hangout user
    _.set('me', gapi.hangout.getLocalParticipant());
    
  }
});

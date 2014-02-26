import
CONSTANTS
from
'appkit/models/constants';

import ActionMixin from 'appkit/mixins/action-mixin';

export default
Ember.ObjectController.extend(ActionMixin, {

  needs: 'application',
  sharedState: Ember.computed.alias('controllers.application.sharedState'),
  participants: Ember.computed.alias('controllers.application.participants'),
  me: Ember.computed.alias('controllers.application.me'),

  /**
   * Gets the full current player
   */
  currentPlayer: function () {
    return this.get('participants').findBy('id', this.get('sharedState.currentPlayer'));
  }.property('sharedState.currentPlayer'),

  /**
   * It's my round, whether it's the action phase, block phase or whatever, everything revolves around ME!
   */
  itsMyRound: function () {
    return this.get('me.id') === this.get('sharedState.currentPlayer');
  }.property('sharedState.currentPlayer', 'me'),

  /**
   * It's my turn AND I GET TO PICK AN ACTION!!!!
   */
  OMGITSMYTURN: function () {
    // really it's only your turn, so calm down. geez.
    return this.get('itsMyRound') &&
      this.get('sharedState.state') === CONSTANTS.STATE.ChoosingAction &&
      this.get('sharedState.phase') === CONSTANTS.PHASE.Action;
  }.property('itsMyRound', 'sharedState.phase', 'sharedState.state'),

  /**
   * Have seen the end, and it is NEAR.  BUT I CAN STOP THIS HORRIBLE FATE FROM PASSING.
   * @constructor
   */
  ICANSTOPTHIS: function () {
    return this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt &&
      // can't challenge your own action
      !(this.get('itsMyRound') && this.get('sharedState.phase') === CONSTANTS.PHASE.ActionChallenge) &&
      // can't block own action
      !(this.get('itsMyRound') && this.get('sharedState.phase') === CONSTANTS.PHASE.Block);
  }.property('sharedState.state', 'sharedState.phase', 'itsMyRound'),

  /**
   * Something has triggered the countdown timer
   *  - I must choose an action
   *  - There is an opportunity to challenge someone
   *  - There is an opportunity to block an action
   */
  countdownIsEnableduh: function () {
    return this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt;
  }.property('sharedState.state'),

  /**
   * Time left on the countdown timer in seconds
   */
  timeLeft: 0,

  /**
   * Peeps gotta know what's up in the game
   */
  actionText: function () {
    if (this.get('sharedState.phase') > CONSTANTS.PHASE.Action) {
      var text = [];
      if (this.get('me.id') === this.get('currentPlayer.id')) {
        text.push('You');
      } else {
        text.push(this.get('currentPlayer.person.displayName'));
      }
      text.push(' chose the action ');
      text.push(this.get('sharedState.action.action.display'));
      text.push('.');
      return text.join('');
    } else {
      return false;
    }
  }.property('sharedState.action', 'sharedState.phase'),

  blockText: function () {
    if (this.get('sharedState.phase') > CONSTANTS.PHASE.Block) {
      var text = [];
      if (this.get('me.id') === this.get('currentPlayer.id')) {
        text.push('You');
      } else {
        text.push(this.get('currentPlayer.person.displayName'));
      }
      text.push(' chose the action ');
      text.push(this.get('sharedState.block.block.display').toString());
      text.push('.');
      return text.join('');
    } else {
      return false;
    }
  }.property('sharedState.block', 'sharedState.phase'),


  actions: {
    start: function () {

      var tempCoins = {};
      var tempCards = {};
      var tempTurns = [];
      var deck = [];
      for (var i = 0; i < 15; i++) {
        deck.push(i % 5);
      }

      this.get('participants').forEach(function (p) {
        // each player gets three coins
        tempCoins[p.id] = 3;

        // each player gets two cards
        tempCards[p.id] = [];
        tempCards[p.id].push(deck.splice(Math.random() * deck.length | 0, 1)[0]);
        tempCards[p.id].push(deck.splice(Math.random() * deck.length | 0, 1)[0]);

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

      this.transitionToRoute('action');

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
  }

//  actions: {
//    chooseBlock: function (blockKey) {
//      if (this.get('sharedState.currentPlayer') === this.get('me.id') &&
//        this.get('sharedState.phase') === CONSTANTS.PHASE.Block &&
//        this.get('sharedState.state') === CONSTANTS.STATE.WaitingForInterrupt) {
//
//        this.set('sharedState.state', CONSTANTS.STATE.EffectSummary);
//        this.set('block.playerId', this.get('me.id'));
//        this.set('block.block', CONSTANTS.BLOCKS[blockKey]);
//        this.set('timeLeft', 5);
//      } else {
//        console.log('attempted to set an action when you just can\'t.');
//      }
//
//    }
//  }
});

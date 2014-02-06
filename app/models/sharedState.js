import CONSTANTS from 'appkit/models/constants';

var SharedState = Ember.Object.extend({
  state: CONSTANTS.STATE.NotStarted,
  phase: CONSTANTS.PHASE.Action,
  currentPlayer: 0, // who's turn it is
  cards: {}, // object key=playerid, value=card array
  coins: {}, // object key=playerId, value=coins
  action: {}, // {playerId, action}
  counterAction: {},
  syncClock:{}, // {playerId, secondsLeft}
                // when a challenge is being discussed, we need to be able to sync the countdown clocks

  initGame: function(participants) {
    var _ = this;

  }


});

export default SharedState;

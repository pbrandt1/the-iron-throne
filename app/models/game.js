import
Player
from
'appkit/models/player';
import
CONSTANTS
from
'appkit/models/constants';


/**
 * Creates the deck of roles.  Each roles is just an
 * @returns {*|Ember.NativeArray}
 */
var createDeck = function () {
  var deck = Em.A([]);
  for (var i = 0; i < 15; i++) {
    deck.pushObject({role: i % 5, owner: null});
  }
  return deck;
};

/**
 * Gets my id from the gapi stuff
 */
var whoAmI = function () {
  return 'nobody';
};

/**
 * Wow.  Such game.  Big object.  Very so.
 * @type {*|void|Object}
 */
var Game = Ember.Object.extend({
  players: Em.A([]),
  state: CONSTANTS.STATE.NotStarted,
  phase: CONSTANTS.PHASE.Action,
  activePlayer: '00000', // string id
  leader: '00000', // string id
  deck: Em.A([]),
  randomNumber: 0,


  /**
   * Create new game.  Note that the last winner is the current leader and will do this whole damn thing.
   */
  newGame: function () {
    var _ = this;

    // give each player 3 coins
    this.players.forEach(function (p) {
      p.set('coins', 3);
    });

    // assign role cards
    this.set('deck', createDeck());
    this.players.forEach(function (p) {
      p.roles.clear();
      var i = Math.random() * _.deck.length | 0;
      p.roles.pushObject(_.deck.splice(i, 1)[0]);

      i = Math.random() * _.deck.length | 0;
      p.roles.pushObject(_.deck.splice(i, 1)[0]);
    });

    // set the game state and phse
    this.set('state', CONSTANTS.STATE.ChoosingAction);
    this.set('phase', CONSTANTS.PHASE.Action);

    // set the leader and active player equal to me!!!
    this.set('activePlayer', whoAmI());
    this.set('leader', whoAmI());
  }
});

export default
Game;

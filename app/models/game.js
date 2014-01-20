import Player from 'appkit/models/player';
import CONSTANTS from 'appkit/models/constants';

var GAME_PHASE = {
  notStarted: 0,
  undeclared: 10,
  declared: 20,
  declarationChallenged: 21
};


var createDeck = function() {
  var deck = Em.A([]);
  for (var i = 0; i < 15; i++) {
    deck.pushObject({role: i%5, owner: null});
  }
  return deck;
};

var Game = Ember.Object.extend({
  players: Em.A([]),
  paused: false,
  started: false,
  phase: null,
  peterIsCool: true,

  newGame: function() {
    // placeholder to check if I am the new leader
    if ('leader' === 'leader') {
      var deck = createDeck();

      this.players.forEach(function(p) {
        p.set('coins', 3);
        p.set('roles', []);
      });

      // assign role cards
      var tempPlayers = this.players.copy();

      tempPlayers.forEach(function(p) {
        var i = Math.random()*deck.length|0;
        p.roles.push(deck.splice(i,1)[0]);

        i = Math.random()*deck.length|0;
        p.roles.push(deck.splice(i,1)[0]);
      });

      this.set('players', tempPlayers);
    }

  },

  init: function() {
    var _ = this;

    _.setProperties({
      paused: false,
      started: false
    });

  }


});

export default Game;

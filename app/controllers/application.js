import Game from 'appkit/models/game';
import Player from 'appkit/models/player';

export default Ember.ObjectController.extend({
  game: Em.O(),

  /**
   * Returns the number of players left
   */
  playersLeft: function() {
    var num = 0;
    if (this.game.players) {
      this.game.players.forEach(function(p) {
        if (p.roles.length > 0) {
          num++;
        }
      });
    }
    return num;
  },

  /**
   * Set up listeners with gapi
   */
  init: function() {
    var _ = this;
    _.set('game', Game.create({}));

    /**
     * Handle shared-state changes.  Shared state is everything in the Game model, including players.
     */
    gapi.hangout.data.onStateChanged.add(function(event) {
      console.log('state changed');
      console.log(JSON.stringify(event.state));

      // As each key of the state hashed is presented, simply update the model accordingly.
      // For complex properties like players, you have to JSON.parse it and set it that way.
      if (typeof _.game[event.state.key] === 'TODO complex type') {
        _.game.set(event.state.key, JSON.parse(event.state.value));
      } else {
        _.game.set(event.state.key, event.state.value);
      }
    });

    /**
     * Add players when a participant opens the app
     */
    gapi.hangout.onParticipantsEnabled.add(function(event) {

      // Always add new players with zero roles so that they do not affect current gameplay, but can join next round
      event.participants.forEach(function(p) {
        if (!_.game.players.findBy('person.id', p.person.id)) {
          _.game.players.pushObject(Player.create(p));
        }
      });
    });

    /**
     * Remove players when a participant disables the app
     */
    gapi.hangout.onParticipantsDisabled.add(function(event) {
      event.participants.forEach(function(p) {
        var player = _.game.players.findBy('person.id', p.person.id);
        _.game.players.popObject(player);
      })
      // TODO check for winner/gameover
      if (_.playersLeft() <= 1) {
        // TODO halt gameplay
      }
    });
  },

  actions: {
    newGame: function() {
      this.game.newGame();
    }
  }
});

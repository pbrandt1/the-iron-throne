import Game from 'appkit/models/game';
import Player from 'appkit/models/player';

export default Ember.ObjectController.extend({
  game: {},

  init: function() {
    var _ = this;
    var game = Game.create();
    _.set('game', game);


    /**
     * Handle shared-state changes
     */
    gapi.hangout.data.onStateChanged.add(function(event) {
      console.log('state changed');
      console.log(JSON.stringify(event.state));
    });

    /**
     * Handle new players
     */
    gapi.hangout.onParticipantsChanged.add(function(event) {
      event.participants.forEach(function(p) {
        if (!_.game.players.findBy('person.id', p.person.id)) {
          _.game.players.pushObject(Player.create(p));
        }
      });
    });
  },

  actions: {
    newGame: function() {
      this.game.newGame();
    }
  }



});

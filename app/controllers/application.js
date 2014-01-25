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
     * Add players when a participant opens the app
     */
    gapi.hangout.onParticipantsEnabled.add(function(event) {
      event.participants.forEach(function(p) {
        if (!_.game.players.findBy('person.id', p.person.id)) {
          _.game.players.pushObject(Player.create(p));
        }
      });
    });

    /**
     * Remove players when a participand disables the app
     */
    gapi.hangout.onParticipantsDisabled.add(function(event) {
      event.participants.forEach(function(p) {
        var player = _.game.players.findBy('person.id', p.person.id);
        _.game.players.popObject(player);
      })
    });
  },

  actions: {
    newGame: function() {
      this.game.newGame();
    }
  }



});

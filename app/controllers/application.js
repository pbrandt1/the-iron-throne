import Game from 'appkit/models/game';

export default Ember.ObjectController.extend({
  game: {},

  init: function() {
    var game = Game.create();
    this.set('game', game);
  }

});

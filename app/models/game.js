import Player from 'appkit/models/player';

var GAME_PHASE = {
  notStarted: 0,
  undeclared: 10,
  declared: 20,
  declarationChallenged: 21
};

var Game = Ember.Object.extend({
  players: null,
  paused: false,
  started: false,
  phase: null,
  peterIsCool: true,

  init: function() {
    var _ = this;

    _.setProperties({
      players: Em.A(gapi.hangout.getParticipants()),
      paused: false,
      started: false
    });


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
      console.log('participants changed');
      console.log(JSON.stringify(event.participants));
      event.participants.forEach(function(p) {
        if (!_.players.findBy('person.id', p.person.id)) {
          _.players.pushObject(Player.create(p));
        }
      });
    });

  }


});

export default Game;

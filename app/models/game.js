var GAME_PHASE = {
  notStarted: 0,
  undeclared: 10,
  declared: 20,
  declarationChallenged: 21,
  declaration

};


var GameState = Ember.Object.extend({
  players: [],
  paused: false,
  started: false,
  phase: null

});

export default GameState;

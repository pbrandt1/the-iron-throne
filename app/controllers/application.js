export default Ember.ObjectController.extend({
  peter: true,
  players: (function() {
    var players = gapi.hangout.getParticipants();
    return players;
  })()
});
export default Ember.ObjectController.extend({
  peter: true,
  players: (function() {
    var players = gapi.hangout.getParticipants();
    return players;
  })()
});

//
///**
// * Handle shared-state changes
// */
//gapi.hangout.data.onStageChanged.add(function(event) {
//  console.log('state changed');
//  console.log(JSON.stringify(event.state));
//});
//
///**
// * Handle new players
// */
//
//
//gapi.hangout.data.onParticipantsChanged.add(function(event) {
//  console.log('participants changed');
//  console.log(JSON.stringify(event.participants));
//});
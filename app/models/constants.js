
var CONSTANTS = {
  /**
   * Court roles
   */
  ROLE: {
    Duke: 1,
    Assassin: 2,
    Ambassador: 3,
    Captain: 4,
    Contessa: 5
  },

  /**
   * Represents the possible view states of a player's screen.
   * Note that these states look different for the active player than they do for the other players.
   *
   * NotStarted: the game has not been started
   * ChoosingAction: We are waiting for someone to either pick an action or a block
   * WaitingForInterrupt: The clock ticks down until someone stops it for a challenge or a block
   * EffectSummary: The screen displays the results of the turn.  If someone looses a crad, it will present that choice
   */
  STATE: {
    NotStarted: 0,
    ChoosingAction: 1,
    WaitingForInterrupt: 2,
    EffectSummary: 3
  },

  /**
   * Turn phase.
   */
  PHASE: {
    Action: 0,
    ActionChallenge: 1,
    Block: 2,
    BlockChallenge: 3,
    Complete: 4
  }
};


export default CONSTANTS;

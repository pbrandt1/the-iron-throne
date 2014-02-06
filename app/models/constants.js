
var CONSTANTS = {};
/**
 * Court roles
 */
CONSTANTS.ROLE= {
    Duke: 1,
    Assassin: 2,
    Ambassador: 3,
    Captain: 4,
    Contessa: 5
};

/**
 * Court roles redux
 */
CONSTANTS.ROLE_INVERSE= {
  1: 'Duke',
  2: 'Assassin',
  3: 'Ambassador',
  4: 'Captain',
  5: 'Contessa'
};

/**
 * Represents the possible view states of a player's screen.
 * Note that these states look different for the active player than they do for the other players.
 *
 * NotStarted: the game has not been started
 * ChoosingAction: We are waiting for someone to either pick an action or a block
 * WaitingForInterrupt: The clock ticks down until someone stops it for a challenge or a block
 * EffectSummary: The screen displays the results of the turn.  If someone looses a crad, it will present that choice
 */
CONSTANTS.STATE = {
  NotStarted: 0,
  ChoosingAction: 1,
  WaitingForInterrupt: 2,
  EffectSummary: 3
};

/**
 * Turn phase.
 */
CONSTANTS.PHASE = {
  Action: 0,
  ActionChallenge: 1,
  Block: 2,
  BlockChallenge: 3,
  Complete: 4
};

/**
 * Available actions
 */
CONSTANTS.ACTIONS = {
  Income: {
    role: 0,
    id: 1,
    cost: 0,
    reward: 1
  },
  ForeignAid: {
    role: 0,
    id: 2,
    cost: 0,
    reward: 2
  },
  Coup: {
    role: 0,
    id: 3,
    cost: 7,
    assassinate: true
  },
  Tax: {
    role: CONSTANTS.ROLE.Duke,
    id: 4,
    reward: 3
  },
  Assassinate: {
    role: CONSTANTS.ROLE.Assassin,
    id: 5,
    cost: 3,
    assassinate: true
  },
  Exchange: {
    role: CONSTANTS.ROLE.Ambassador,
    id: 6,
    exchange: true
  },
  Steal: {
    role: CONSTANTS.ROLE.Captain,
    id: 7,
    steal: 2
  }
};

/**
 * Available counteractions
 */
CONSTANTS.COUNTERACTIONS = {
  BlockForeignAid: {
    role: 1,
    action: CONSTANTS.ACTIONS.ForeignAid.id
  },
  BlockStealingA: {
    role: 3,
    action: CONSTANTS.ACTIONS.Steal.id
  },
  BlockStealingC: {
    role: 4,
    action: CONSTANTS.ACTIONS.Steal.id
  },
  BlockAssassination: {
    role: 5,
    action: CONSTANTS.ACTIONS.Assassinate.id
  }
};


export default CONSTANTS;

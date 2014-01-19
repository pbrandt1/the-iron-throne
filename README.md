# The Iron Throne
A google hangout game based on The Resistance: Coup.

## Rules
A players turn goes like this
1. Player states an action
2. Player gives an opportunity for other players to challenge the Role (if any)
3. If play continues, Player gives an opportunity for other players to block
4. If another player blocks, Player gives the other players an opportunity to challenge the blocker’s role.

### Free Actions
* Income earns a player an (unblockable) one golden dragon from the bank
* Foreign Aid earns a player a blockable two golden dragons from the bank
* Coup costs seven credits but is an unblockable assassination!

### Role Actions

#### Role 1 [petyr baelish]
* Can “Tax” which generates three golden dragons from the bank
* Can block Foreign Aid

#### Role 2 [the hound]
* Can “Assassinate” which takes away 1 card from another player
* cost: 3 golden dragons

#### Role 3 [Jacquen Hagar]
* Can “Exchange” which allows a person to exchange 0, 1, or both of their role cards.
* Can block Stealing

#### Role 4 [arya]
* Can “Steal” which takes two golden dragons from another player
* Can block Stealing

#### Role 5 [Meslissandre, the red priest]
* Can block Assassinate


## Teh Codez
A google hangout has a shared state, which means there is NO central server, but one client is crowned as “master.”  The master peer will setup the initial state of the game, but provides no other functions (note that in the final implementation, a master may not be necessary).

### Shared State
When designing the shared state, make it as flat as possible to enable as granular changes as possible.  This avoids state conflicts.

### Possible pieces on info in the shared state
Connected Peers Turn Order

Set by the order of “join” and in case of a tie by a random ordering provided by the master peer

Set by the master peer in the case of a disconnect of one peer

Current Turn

Set: only allowed by Current Turn owner or the elected master peer in the case of the absence of the current turn owner

Current Action

Current Action Challenger

Current Block

Current Blocker

Current Block Challenger

Current Turn Phase

Undeclared

Declared

Declaration Challenged

Declaration Challenge - Truth

Challenger loses role

Declaration Challenge - Bluff

Current turn holder loses role

End Turn

Declaration Succeeded

Current turn holder pays cost

No Block Announced

Action effects happen

End Turn

Block Announced

Block Succeeded

End Turn

Block Challenged

Block Challenge - Truth

Block challenger loses role

End Turn

Block Challenge - Bluff

Action effects happen

Blocker loses role

End Turn

Card Deck

Finite deck of cards.  Dictionary of Type:Peer pairs.  Set by anyone

Credit Bank

Infinite.  Dictionary of Peer:Credits pairs.  Set by anyone.

Game Status

Created

Started

Completed

### Example Three Player Game (a, b and c)

a: true, // true: in game, false: out of game (or disconnected)
b: false,
c: false,
a_id: 123123124,
b_id: 124141251,
c_id: 125382730,
currentTurn: “b”,
action: 1,
actionChallenger: null,
block: 2,
blockChallenger: 12412431,
turnStage: 9,
a_roles: [0, 3],
b_roles: [1],
c_roles: [1, 2]
a_credits: 3,
b_credits: 5,
c_credits: 0
gameStatus: 1

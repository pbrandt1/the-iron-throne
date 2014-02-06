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

#### Duke [petyr baelish]
* Can “Tax” which generates three golden dragons from the bank
* Can block Foreign Aid

#### Assassin [the hound]
* Can “Assassinate” which takes away 1 card from another player
* cost: 3 golden dragons

#### Ambassador [Jacquen Hagar]
* Can “Exchange” which allows a person to exchange 0, 1, or both of their role cards.
* Can block Stealing

#### Captain [arya]
* Can “Steal” which takes two golden dragons from another player
* Can block Stealing

#### Contessa [Meslissandre, the red priest]
* Can block Assassinate


## Teh Codez
A google hangout has a shared state, which means there is NO central server, but one client is crowned as “master.”  The master peer will setup the initial state of the game, but provides no other functions (note that in the final implementation, a master may not be necessary).

### Shared State
When designing the shared state, make it as flat as possible to enable as granular changes as possible.

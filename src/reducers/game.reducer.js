import constants from '../constants/game.constants'

const initialState = {}

const GameReducer = (state = initialState, action) => {
  let currentState
  let newState
  let lastState
  let restoredState
  switch (action.type) {
    case constants.START_GAME:
      newState = {
        players: action.players,
        thrower: action.id,
      }
      for (const player of action.players) {
        newState[player.id] = {
          id: player.id,
          score: 501,
          name: player.name,
        }
      }
      newState.snapshots = []
      return Object.assign({}, state, newState)

    case constants.UNDO_GAME_ACTION:
      currentState = state
      lastState = state.snapshots.pop()
      restoredState = Object.assign({}, lastState, {
        redos: [...state.redos, currentState],
      })
      return restoredState

    case constants.REDO_GAME_ACTION:
      currentState = state
      lastState = state.redos.pop()
      return Object.assign({}, lastState, {
        snapshots: [...state.snapshots, currentState],
      })

    case constants.END_GAME:
      return initialState

    case constants.UPDATE_GAME_SCORE:
      // Whilst updating game score we need to update the thrower too?
      newState = {}
      // Work out the next thrower
      if (state.players.length > 1) {
        let currentThrowerIndex = state.players.findIndex(
          p => p.id === state.thrower
        )
        const nextThrowerIndex =
          currentThrowerIndex === state.players.length - 1
            ? 0
            : currentThrowerIndex + 1
        newState.thrower = state.players[nextThrowerIndex].id
      }
      newState[action.player.id] = action.player
      // Every time there is a score update, we can take a snapshot of the state and add it to
      newState.snapshots = [...state.snapshots, state]
      newState.redos = []
      return Object.assign({}, state, newState)

    default:
      return state
  }
}

export default GameReducer

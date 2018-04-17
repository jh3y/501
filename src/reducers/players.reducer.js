import constants from '../constants/player.constants'

const initialState = []

const PlayersReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_PLAYER:
      return [...state, {
        name: action.name,
        id: Math.random().toString(36).substr(2, 9)
      }]
    case constants.REMOVE_PLAYER:
      return state.filter((p) => p.id !== action.id)
    default:
      return state
  }
}

export default PlayersReducer
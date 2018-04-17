import constants from '../constants/player.constants'

const addPlayer = (name) => ({
  type: constants.ADD_PLAYER,
  name,
})

const removePlayer = (id) => ({
  type: constants.REMOVE_PLAYER,
  id,
})

export {
  addPlayer,
  removePlayer,
}
import constants from '../constants/game.constants'

const startGame = (players, id) => ({
  type: constants.START_GAME,
  players,
  id,
})

const endCurrentGame = () => ({
  type: constants.END_GAME,
})

const endGame = () => (dispatch, getState) =>
  new Promise(resolve => {
    dispatch(endCurrentGame())
    resolve()
  })

const updateScore = player => ({
  type: constants.UPDATE_GAME_SCORE,
  player,
})

const undo = () => ({
  type: constants.UNDO_GAME_ACTION
})

const redo = () => ({
  type: constants.REDO_GAME_ACTION
})

export { startGame, endGame, updateScore, undo, redo }

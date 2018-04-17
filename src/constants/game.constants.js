import KeyMirror from 'key-mirror'

const ACTIONS = KeyMirror({
  END_GAME: null,
  START_GAME: null,
  UNDO_GAME_ACTION: null,
  REDO_GAME_ACTION: null,
  UPDATE_GAME_SCORE: null,
})

export default ACTIONS
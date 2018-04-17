import { combineReducers } from 'redux'
import game from './game.reducer'
import players from './players.reducer'

const AppReducer = combineReducers({
  game,
  players,
})

export default AppReducer
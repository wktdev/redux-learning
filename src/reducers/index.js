import { combineReducers } from 'redux'
import playReducerData from './play_reducer'
import stopReducerData from './stop_reducer'

export default combineReducers({
  playReducerData,
  stopReducerData
})
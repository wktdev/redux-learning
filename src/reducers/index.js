import { combineReducers } from 'redux'
import playStopToggle from './playStopToggleReducer'
import record from "./recordReducer"

export default combineReducers({
  playStopToggle,
  record
})
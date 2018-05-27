import { combineReducers } from 'redux'
import playToggle from './play_toggle_reducer'
import captureFormInput from './capture_form_input_reducer'

export default combineReducers({
  playToggle,
  captureFormInput
})
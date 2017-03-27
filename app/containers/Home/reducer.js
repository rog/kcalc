/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable'

import {
  INTAKE_LOAD_SUCCESS,
  INTAKE_LOAD_ERROR,
  INTAKE_MEAL_EDIT,
  INTAKE_MEAL_DELETE
} from './constants'

// The initial state of the App
const initialState = fromJS({
  message: '',
  intake: [],
  meal: {}
})

function appReducer (state = initialState, action) {
  switch (action.type) {
    case INTAKE_LOAD_SUCCESS:
      return state
        .set('intake', action.response)
        .set('message', '')
    case INTAKE_LOAD_ERROR:
      return state
        .set('message', action.response.error)
    case INTAKE_MEAL_EDIT:
      return state
        .set('meal', action.response)
    case INTAKE_MEAL_DELETE:
      return state
        .set('message', '')
    default:
      return state
  }
}

export default appReducer

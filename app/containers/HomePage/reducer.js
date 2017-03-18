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
  MEAL_ADD_SUCCESS,
  MEAL_ADD_ERROR,
  MEAL_UPDATE_SUCCESS
} from './constants'

// The initial state of the App
const initialState = fromJS({
  message: '',
  meal: {
    meal: false,
    calories: false,
    date: false,
    time: false
  }
})

function appReducer (state = initialState, action) {
  switch (action.type) {
    case MEAL_ADD_SUCCESS:
      return state
        .set('message', action.response)
    case MEAL_ADD_ERROR:
      return state
        .set('message', action.response)
    case MEAL_UPDATE_SUCCESS:
      return state
        .set('message', action.response)
    default:
      return state
  }
}

export default appReducer

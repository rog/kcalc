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
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  SIGN_UP_SUCCESS
} from './constants'

// The initial state of the App
const initialState = fromJS({
  session: {
    logged: false,
    message: ''
  },
  credentials: {
  }
})

function appReducer (state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      sessionStorage.setItem('credentials', JSON.stringify(action.session))
      return state
      .set('credentials', action.session)
      .setIn(['session', 'logged'], true)
    case LOG_IN_ERROR:
      sessionStorage.setItem('credentials', {})
      return state
      .set('credentials', {})
      .setIn(['session', 'logged'], false)
      .setIn(['session', 'message'], action.error)
    case SIGN_UP_SUCCESS:
      sessionStorage.setItem('credentials', JSON.stringify(action.session))
      return state
      .set('credentials', action.session)
      .setIn(['session', 'logged'], true)
      .setIn(['session', 'message'], action.response)
    default:
      return state
  }
}

export default appReducer

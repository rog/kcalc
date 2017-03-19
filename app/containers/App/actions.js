/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  SIGN_UP_SUCCESS
} from './constants'

import sessionApi from 'containers/Login/SessionApi'
import {browserHistory} from 'react-router'

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function logInSuccess (session) {
  return {
    type: LOG_IN_SUCCESS,
    session
  }
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function logInError (error) {
  return {
    type: LOG_IN_ERROR,
    error
  }
}

export function logInUser (credentials) {
  return function (dispatch) {
    return sessionApi.login(credentials).then(response => {
      console.log(response)
      if (response.success) {
        sessionStorage.setItem('jwt', response.success)
        browserHistory.push('/')
        dispatch(logInSuccess(response))
      } else {
        dispatch(logInError(response.error))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

export function logOutUser () {
  return function (dispatch) {
    sessionStorage.setItem('jwt', false)
    browserHistory.push('/login')
    dispatch(logInError(''))
  }
}

export function signUpSuccess (response) {
  return {
    type: SIGN_UP_SUCCESS,
    response
  }
}

export function signUpUser (credentials) {
  return function (dispatch) {
    return sessionApi.sign(credentials).then(response => {
      if (response.success) {
        dispatch(signUpSuccess('cool'))
        setTimeout(() => {
          return sessionApi.login(credentials).then(response => {
            if (response.success) {
              sessionStorage.setItem('jwt', response.success)
              browserHistory.push('/')
              dispatch(logInSuccess(response))
            } else {
              dispatch(logInError(response.error))
            }
          }).catch(error => {
            throw (error)
          })
        }, 2000)
      } else {
        dispatch(signUpSuccess(response.error))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

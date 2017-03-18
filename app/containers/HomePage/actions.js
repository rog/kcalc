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
  MEAL_ADD_SUCCESS,
  MEAL_ADD_ERROR,
  MEAL_UPDATE_SUCCESS
} from './constants'

import mealApi from 'containers/HomePage/MealApi'
import {browserHistory} from 'react-router'

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function mealAddSuccess (response) {
  return {
    type: MEAL_ADD_SUCCESS,
    response
  }
}

export function mealAddError (response) {
  return {
    type: MEAL_ADD_ERROR,
    response
  }
}

export function mealUpdateSuccess (response) {
  return {
    type: MEAL_UPDATE_SUCCESS,
    response
  }
}

export function mealAdd (meal) {
  return function (dispatch) {
    return mealApi.create(meal).then(response => {
      if (response.createdAt) {
        dispatch(mealAddSuccess('cool'))
        setTimeout(() => {
          browserHistory.push('/')
          dispatch(mealAddError({error: false, message: ''}))
        }, 500)
      } else {
        dispatch(mealAddError({error: true, message: response.error}))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

export function mealUpdate (meal) {
  return function (dispatch) {
    return mealApi.update(meal).then(response => {
      if (response.success) {
        dispatch(mealUpdateSuccess('cool'))
        setTimeout(() => {
          browserHistory.push('/')
          dispatch(mealAddError({error: false, message: ''}))
        }, 500)
      } else {
        dispatch(mealAddError({error: true, message: response.error}))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

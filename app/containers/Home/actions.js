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
  INTAKE_LOAD_SUCCESS,
  INTAKE_LOAD_ERROR,
  INTAKE_MEAL_EDIT,
  INTAKE_MEAL_DELETE
} from './constants'

import IntakeApi from 'containers/Home/IntakeApi'
import {browserHistory} from 'react-router'

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function intakeLoadSuccess (response) {
  return {
    type: INTAKE_LOAD_SUCCESS,
    response
  }
}

export function intakeLoadError (response) {
  return {
    type: INTAKE_LOAD_ERROR,
    response
  }
}

export function intakeMealEdit (response) {
  return {
    type: INTAKE_MEAL_EDIT,
    response
  }
}

export function intakeMealDelete (response) {
  return {
    type: INTAKE_MEAL_DELETE,
    response
  }
}

export function intakeLoad () {
  return function (dispatch) {
    return IntakeApi.load().then(response => {
      if (!response.error) {
        dispatch(intakeLoadSuccess(response))
      } else {
        dispatch(intakeLoadError(response))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

export function intakeLoadByDate (date) {
  return function (dispatch) {
    return IntakeApi.loadByDate(date).then(response => {
      console.log(response)
      if (!response.error) {
        dispatch(intakeLoadSuccess(response))
      } else {
        dispatch(intakeLoadError(response))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

export function intakeLoadByPeriod (period) {
  return function (dispatch) {
    return IntakeApi.loadByPeriod(period).then(response => {
      if (!response.error) {
        dispatch(intakeLoadSuccess(response))
      } else {
        dispatch(intakeLoadError(response))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

export function mealEdit (meal) {
  return function (dispatch) {
    dispatch(intakeMealEdit(meal))
    browserHistory.push('/meal/edit')
  }
}

export function mealDelete (meal) {
  return function (dispatch) {
    return IntakeApi.delete(meal).then(response => {
      if (!response.error) {
        dispatch(intakeMealDelete(response))
        IntakeApi.load().then(response => {
          if (!response.error) {
            dispatch(intakeLoadSuccess(response))
          } else {
            dispatch(intakeLoadError(response))
          }
        })
      } else {
        dispatch(intakeLoadError(response))
      }
    }).catch(error => {
      throw (error)
    })
  }
}

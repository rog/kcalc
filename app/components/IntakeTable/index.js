/*
 * HomePage
 *
 * This is the first thing users see at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as intakeActions from 'containers/Home/actions'

import Message from 'components/Message'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'
import {filter} from 'lodash'

import style from './style.scss'

class IntakeTable extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      message: this.props.message,
      intake: this.props.intake
    }
    this.getRow = this.getRow.bind(this)
    this.getCalories = this.getCalories.bind(this)
    this.getMessage = this.getMessage.bind(this)
    this.getMealTime = this.getMealTime.bind(this)
    this.deleteMeal = this.deleteMeal.bind(this)
  }
  componentWillMount () {
    this.props.actions.intakeLoadByDate(this.props.date)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.actions.intakeLoadByDate(nextProps.date)
    }
  }

  getMealTime (time) {
    return filter(this.props.intake, ['time', time])
  }

  getCalories (meals) {
    return meals.reduce(function (total, number) { return total + number.calories }, 0)
  }

  editMeal (meal) {
    this.props.actions.mealEdit(meal)
  }

  deleteMeal (meal) {
    const erase = window.confirm('do you want to delete this entry?')
    if (erase) {
      this.props.actions.mealDelete(meal)
    }
  }

  getRow (item, id) {
    return (
      <tr key={id}>
        <td>{item.meal}</td>
        <td>{item.calories}</td>
        <td>
          <div className='control is-grouped'>
            <p className='control'>
              <button onClick={() => this.editMeal(item)} className='button is-outlined is-info is-small'>
                <span className='icon is-small'>
                  <i className='fa fa-edit' />
                </span>
                <span>Edit</span>
              </button>
            </p>
            <p className='control'>
              <button onClick={() => this.deleteMeal(item)} className='button is-outlined is-danger is-small'>
                <span className='icon is-small'>
                  <i className='fa fa-trash-o' />
                </span>
                <span>Delete</span>
              </button>
            </p>
          </div>
        </td>
      </tr>
    )
  }

  getMessage (message) {
    if (message) {
      return (
        <Message message={message} type={'danger'} />
      )
    } else {
      return ('')
    }
  }

  render () {
    const {formatMessage} = this.props.intl
    return (
      <div className={style.IntakeTable}>
        {this.getMessage(this.props.message)}
        <table className='table is-bordered'>
          <thead>
            <tr className={style.IntakeTable__Head}>
              <th>Meal</th>
              <th>Calories</th>
              <th className={style.IntakeTable__ActionsRow}>Actions</th>
            </tr>
          </thead>
          <tfoot>
            <tr className={style.IntakeTable__Footer}>
              <th />
              <th colSpan='2'>
                <span>Total:</span>{this.getCalories(this.props.intake)}<span>calories</span>
              </th>
            </tr>
          </tfoot>
          <tbody>
            <tr className={style.IntakeTable__HeadTime}>
              <th colSpan='2'>Breakfast</th>
              <th className={style.IntakeTable__HeadTime__Calories}>
                <span className='tag is-white is-medium'>
                  {this.getCalories(this.getMealTime('breakfast'))}
                </span>
              </th>
            </tr>
            {this.getMealTime('breakfast').map((item, idx) => {
              return this.getRow(item, idx)
            })}
            <tr className={style.IntakeTable__HeadTime}>
              <th colSpan='2'>Lunch</th>
              <th className={style.IntakeTable__HeadTime__Calories}>
                <span className='tag is-white is-medium'>
                  {this.getCalories(this.getMealTime('lunch'))}
                </span>
              </th>
            </tr>
            {this.getMealTime('lunch').map((item, idx) => {
              return this.getRow(item, idx)
            })}
            <tr className={style.IntakeTable__HeadTime}>
              <th colSpan='2'>Snack</th>
              <th className={style.IntakeTable__HeadTime__Calories}>
                <span className='tag is-white is-medium'>
                  {this.getCalories(this.getMealTime('snack'))}
                </span>
              </th>
            </tr>
            {this.getMealTime('snack').map((item, idx) => {
              return this.getRow(item, idx)
            })}
            <tr className={style.IntakeTable__HeadTime}>
              <th colSpan='2'>Dinner</th>
              <th className={style.IntakeTable__HeadTime__Calories}>
                <span className='tag is-white is-medium'>
                  {this.getCalories(this.getMealTime('dinner'))}
                </span>
              </th>
            </tr>
            {this.getMealTime('dinner').map((item, idx) => {
              return this.getRow(item, idx)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

IntakeTable.propTypes = {
  intl: intlShape.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(intakeActions, dispatch)
  }
}

function mapStateToProps (state, ownProps) {
  const selectState = state.get('intake')
  const intake = selectState.get('intake')
  return {
    message: selectState.get('message'),
    intake: intake
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(IntakeTable))

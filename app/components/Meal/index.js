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
import * as mealActions from 'containers/HomePage/actions'

import Message from 'components/Message'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import messages from './messages'

import classNames from 'classnames'
import style from './style.scss'

class Meal extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      save: false,
      loading: false,
      valid: true,
      message: this.props.message,
      credentials: this.props.credentials,
      meal: {
        meal: '',
        calories: '',
        date: '',
        time: ''
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.validateMeal = this.validateMeal.bind(this)
    this.getMessage = this.getMessage.bind(this)
  }

  componentDidMount () {
    const meal = {}
    console.log(this.props)
    if (this.props.action === 'edit') {
      meal['meal'] = this.props.meal['meal']
      meal['calories'] = this.props.meal['calories']
      meal['date'] = new Date(this.props.meal['date']).toISOString().slice(0, 10)
      meal['time'] = this.props.meal['time']
      this.setState({meal, save: false, valid: false, message: '', loading: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    const meal = {}
    if (nextProps.action === 'add') {
      meal['meal'] = ''
      meal['calories'] = ''
      meal['date'] = ''
      meal['time'] = ''
      this.setState({meal, save: false, valid: false, message: '', loading: false})
    }
  }

  onChange (event) {
    const field = event.target.name
    const value = event.target.value
    this.setState(function (prevState) {
      let meal = Object.assign({}, prevState.meal)
      meal[field] = value
      let valid = prevState.valid
      let message = prevState.message
      if (this.validateMeal(meal)) {
        valid = true
        message = ''
      }
      return {valid, message, meal}
    })
  }

  onSave (event) {
    event.preventDefault()
    const meal = this.state.meal
    this.setState({save: true})
    if (this.validateMeal(this.state.meal)) {
      meal['id'] = this.props.meal._id
      this.setState({loading: true})
    }
    if (this.props.action === 'edit') {
      this.props.actions.mealUpdate(meal)
    } else {
      this.props.actions.mealAdd(meal)
    }
  }

  validateMeal (meal) {
    for (var o in meal) {
      if (meal[o] === '') {
        this.setState({
          valid: false,
          message: messages.invalidMeal
        })
        return false
      }
    }
    return true
  }

  getMessage (message) {
    const {formatMessage} = this.props.intl
    let type = 'danger'
    if (message === 'cool') {
      type = 'info'
      message = messages.successMeal
    }
    if (message.error) {
      message = {
        id: messages.errorMeal.id,
        values: {
          error: message.message
        }
      }
    }
    if (message && this.state.save) {
      return (
        <Message message={formatMessage(message, message.values)} type={type} />
      )
    } else {
      return ('')
    }
  }

  render () {
    const {formatMessage} = this.props.intl
    let messageTxt = (this.props.message === 'cool' || this.props.message.error) ? this.props.message : this.state.message
    return (
      <div className={style.Meal}>
        <form onSubmit={this.onSave}>
          <h1 className='title'><FormattedMessage {...messages.title} /></h1>
          <h2 className='subtitle'><FormattedMessage {...messages.subtitle} /></h2>
          <div className='control'>
            <p className='control is-expanded has-icon'>
              <input name='meal' className={
                classNames([
                  'input',
                  'is-medium',
                  this.state.save === true && this.state.meal['meal'] === '' ? 'is-danger' : ''
                ])}
                type='text' placeholder={formatMessage(messages.inputMeal)}
                value={this.state.meal['meal']}
                onChange={this.onChange} />
              <span className='icon'>
                <i className='fa fa-cutlery' />
              </span>
            </p>
          </div>
          <div className='control'>
            <p className='control is-expanded has-icon'>
              <input name='calories' className={
                classNames([
                  'input',
                  'is-medium',
                  this.state.save === true && this.state.meal['calories'] === '' ? 'is-danger' : ''
                ])} type='number' placeholder={formatMessage(messages.inputCalories)}
                value={this.state.meal['calories']}
                onChange={this.onChange} />
              <span className='icon'>
                <i className='fa fa-thermometer-quarter' />
              </span>
            </p>
          </div>
          <div className='control is-grouped'>
            <p className='control is-expanded has-icon'>
              <input name='date' className={
                classNames([
                  'input',
                  'is-medium',
                  this.state.save === true && this.state.meal['date'] === '' ? 'is-danger' : ''
                ])} type='date'
                value={this.state.meal['date']}
                onChange={this.onChange} />
              <span className='icon'>
                <i className='fa fa-calendar' />
              </span>
            </p>
            <p className='control is-expanded'>
              <span className={
                classNames([
                  'select',
                  'is-medium',
                  this.state.save === true && this.state.meal['time'] === '' ? style.Meal__inputDanger : ''
                ])}>
                <select name='time' value={this.state.meal['time']} onChange={this.onChange}>
                  <option value=''>{formatMessage(messages.selectTime)}</option>
                  <option value='breakfast'>{formatMessage(messages.selectBreakfast)}</option>
                  <option value='lunch'>{formatMessage(messages.selectLunch)}</option>
                  <option value='snack'>{formatMessage(messages.selectSnack)}</option>
                  <option value='dinner'>{formatMessage(messages.selectDinner)}</option>
                </select>
              </span>
            </p>
          </div>
          <p className='control'>
            <button className={
              classNames(
                'button',
                'is-info',
                'is-medium',
                (this.state.loading) ? 'is-loading' : ''
              )
            }>
              <span>
                <FormattedMessage {...messages.buttonAddMeal} />
              </span>
              <span className='icon is-small'>
                <i className='fa fa-plus' />
              </span>
            </button>
          </p>
          {this.getMessage(messageTxt)}
        </form>
      </div>
    )
  }
}

Meal.propTypes = {
  intl: intlShape.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(mealActions, dispatch)
  }
}

function mapStateToProps (state, ownProps) {
  const selectState = state.get('meal')
  const selectIntake = state.get('intake')
  const intakeMeal = selectIntake.get('meal')
  return {
    message: selectState.get('message'),
    meal: intakeMeal
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Meal))

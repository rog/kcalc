/*
 * PeriodGraph
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

import {Bar} from 'react-chartjs-2'
import Message from 'components/Message'
import { injectIntl, intlShape } from 'react-intl'

import style from './style.scss'
import moment from 'moment'

class PeriodGraph extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      message: this.props.message,
      intake: this.props.intake
    }
    this.getData = this.getData.bind(this)
  }
  componentWillMount () {
    this.props.actions.intakeLoadByPeriod(this.props.period)
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

  getData (period) {
    const intake = this.props.intake
    let day = 0
    const days = (period === 'week') ? 7 : new Date().getDate()
    const data = Array(...Array(days)).map(() => 0)
    const labels = Array(...Array(days)).map(() => {
      day++
      return moment().date(day).format('D-MM-YYYY')
    })
    intake.forEach(function (meal) {
      if (period === 'week') {
        data[moment(meal.date).day()] += meal.calories
      } else {
        data[moment(meal.date).date()] += meal.calories
      }
    })
    return {data, labels}
  }

  render () {
    const getData = this.getData(this.props.period)
    const data = {
      labels: getData.labels,
      datasets: [{
        label: 'Calories consumed this ' + ((this.props.period === 'week') ? 'week' : 'month'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 0, 172, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 0, 172, 1)'
        ],
        borderWidth: 1,
        data: getData.data
      }]
    }

    return (
      <div className={style.IntakeTable}>
        {this.getMessage(this.props.message)}
        <div className={style.IntakeGraph}>
          <Bar data={data} width={100} height={350} options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    )
  }
}

PeriodGraph.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PeriodGraph))

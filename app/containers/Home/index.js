/*
 * HomePage
 *
 * This is the first thing users see at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react'

import IntakeTable from 'components/IntakeTable'
import PeriodGraph from 'components/PeriodGraph'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'

import classNames from 'classnames'
import style from './style.scss'
import moment from 'moment'

export default class HomePage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      day: moment().format('YYYY-MM-DD'),
      period: 'today'
    }
    this.selectDate = this.selectDate.bind(this)
    this.selectPeriod = this.selectPeriod.bind(this)
  }

  selectDate (event) {
    this.setState({day: event.target.value})
  }

  selectPeriod (event) {
    const period = event.currentTarget.dataset.value
    let day = this.state.day
    if (period === 'today') {
      day = new Date().toISOString().slice(0, 10)
    }
    this.setState({period, day})
  }

  renderJournal () {
    if (this.state.period === 'today') {
      return <IntakeTable date={this.state.day} />
    }
    return <PeriodGraph />
  }
  render () {
    return (
      <div>
        <Navigation location={this.props.location.pathname} />
        <div className={style.Journal}>
          <div className='columns'>
            <div className='column'>
              <h1 className='title'>Intake Journal</h1>
              <h2 className='subtitle'>The meals that you had today</h2>
            </div>
            <div className='column is-one-third'>
              <div className='tabs is-toggle is-right'>
                <ul>
                  <li className={(this.state.period === 'today') ? 'is-active' : ''}>
                    <a onClick={this.selectPeriod} data-value='today'><span>Today</span></a>
                  </li>
                  <li className={(this.state.period === 'week') ? 'is-active' : ''}>
                    <a onClick={this.selectPeriod} data-value='week'><span>Week</span></a>
                  </li>
                  <li className={(this.state.period === 'month') ? 'is-active' : ''}>
                    <a onClick={this.selectPeriod} data-value='month'><span>Month</span></a>
                  </li>
                </ul>
              </div>
              <div className={classNames('control', style.Journal__Date)}>
                <input type='date' className='input is-small' value={this.state.day} max={new Date().toISOString().slice(0, 10)} onChange={this.selectDate} />
              </div>
            </div>
          </div>
          {this.renderJournal()}
        </div>
        <Footer />
      </div>
    )
  }
}

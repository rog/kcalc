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

import style from './style.scss'

class PeriodGraph extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      message: this.props.message,
      intake: this.props.intake
    }
  }
  componentWillMount () {
    // this.props.actions.intakeLoadByDate()
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
    return (
      <div className={style.IntakeTable}>
        {this.getMessage(this.props.message)}
        Hey
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

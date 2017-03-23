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
import {Link} from 'react-router'
import * as sessionActions from 'containers/App/actions'

import Logo from '../../components/Logo'

import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import style from './style.scss'

class Navigation extends React.PureComponent {
  render () {
    return (
      <nav className='nav has-shadow'>
        <div className='container'>
          <div className='nav-left'>
            <span className={classNames('nav-item', style.Nav__Logo)}>
              <Logo />
            </span>
            <Link to='/' className={
              classNames('nav-item', 'is-tab',
              (this.props.location === '/') ? 'is-active' : ''
            )}>
              <span className={classNames('icon', 'is-small', style.Nav__Icon)}>
                <i className='fa fa-list-alt' />
              </span>
              <FormattedMessage {...messages.tabIntake} />
            </Link>
            <Link to='/meal/add' className={
              classNames('nav-item', 'is-tab',
              (this.props.location === '/meal/add') ? 'is-active' : ''
            )}>
              <span className={classNames('icon', 'is-small', style.Nav__Icon)}>
                <i className='fa fa-plus' />
              </span>
              <span>
                <FormattedMessage {...messages.buttonAddMeal} />
              </span>
            </Link>
          </div>
          <div className='nav-right nav-menu'>
            <a className={
              classNames('nav-item', 'is-tab',
              (this.props.location === '/profile') ? 'is-active' : ''
            )}>
              <span className={classNames('icon', 'is-small', style.Nav__Icon)}>
                <i className='fa fa-user-circle' />
              </span>
              <span>Rogelio Alberto</span>
            </a>
            <a className='nav-item is-hidden-mobile is-tab' onClick={() => this.props.actions.logOutUser()}>
              <span>
                <FormattedMessage {...messages.menuLogout} />
              </span>
              <span className={classNames('icon', 'is-small', style.Nav__Icon)}>
                <i className='fa fa-sign-out' />
              </span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(Navigation)

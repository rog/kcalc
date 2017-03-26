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

import Logo from 'components/Logo'
import Message from 'components/Message'
import Footer from 'components/Footer'

import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'
import classNames from 'classnames'
import style from './style.scss'

class Login extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.getMessage = this.getMessage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onChange (event) {
    const field = event.target.name
    this.setState({[field]: event.target.value})
  }

  onSave (event) {
    event.preventDefault()
    if (this.props.route.name === 'signup') {
      this.props.actions.signUpUser(this.state)
    } else {
      this.props.actions.logInUser(this.state)
    }
  }

  getMessage (message) {
    let type = (this.props.session.message !== 'cool') ? 'danger' : 'info'
    if (message) {
      return (
        <Message message={message} type={type} />
      )
    } else {
      return ('')
    }
  }

  render () {
    const {formatMessage} = this.props.intl
    const isLogin = this.props.route.name === 'login'
    let messageTxt = (this.props.session.message === 'cool') ? formatMessage(messages.registerOk) : this.props.session.message

    return (
      <div className={style.Login__Wrapper}>
        <div className={style.Login}>
          <div className={style.Login__Container}>
            <Logo />
            <form onSubmit={this.onSave}>
              <p className='control has-icon'>
                <input name='email' className='input is-medium' type='email' placeholder='hello@email.com' value={this.state.email} onChange={this.onChange} />
                <span className='icon'>
                  <i className='fa fa-user' />
                </span>
              </p>
              <p className='control has-icon'>
                <input name='password' className='input is-medium' type='password' placeholder={formatMessage(messages.password)} value={this.state.password} onChange={this.onChange} />
                <span className='icon'>
                  <i className='fa fa-lock' />
                </span>
              </p>
              <div className='control is-grouped'>
                <p className='control'>
                  <button className={
                    classNames([
                      'button',
                      isLogin ? 'is-success' : 'is-info',
                      'is-medium'
                    ])
                  }>
                    <span>
                      {formatMessage(isLogin ? messages.login : messages.register)}
                    </span>
                    <span className='icon is-small'>
                      <i className='fa fa-chevron-right' />
                    </span>
                  </button>
                </p>
                <p className={style.Login__Signup}>
                  <Link to={isLogin ? `signup` : `login`} >
                    {formatMessage(isLogin ? messages.register : messages.login)}
                  </Link>
                </p>
              </div>
            </form>
            {this.getMessage(messageTxt)}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

Login.propTypes = {
  intl: intlShape.isRequired,
  session: React.PropTypes.object
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

function mapStateToProps (state, ownProps) {
  const selectGlobal = state.get('global')
  const selectSession = selectGlobal.get('session')
  return {
    session: {
      logged: selectSession.get('logged'),
      message: selectSession.get('message')
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))

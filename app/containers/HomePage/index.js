/*
 * HomePage
 *
 * This is the first thing users see at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Logo from '../../components/Logo'

export default class HomePage extends React.PureComponent {
  render () {
    return (
      <h1>
        <Logo />
        <FormattedMessage {...messages.header} />
      </h1>
    )
  }
}

/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    )
  }
}

/*
 * HomePage
 *
 * This is the first thing users see at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react'

import Meal from '../../components/Meal'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default class HomePage extends React.PureComponent {
  render () {
    return (
      <div>
        <Navigation location={this.props.location.pathname} />
        <Meal action={this.props.route.action} />
        <Footer />
      </div>
    )
  }
}

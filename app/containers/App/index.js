/**
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react'

import style from './style.scss'

export default class App extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div className={style.wrapper}>
        {React.Children.toArray(this.props.children)}
      </div>
    )
  }
}

import React from 'react'

import classNames from 'classnames'
import style from './style.scss'

export default class Message extends React.PureComponent {
  constructor (props) {
    super(props)
    this.getHeader = this.getHeader.bind(this)
  }

  getHeader (title) {
    return (
      <div className='message-header'>
        <p>{title}</p>
      </div>
    )
  }
  render () {
    const messageHeader = (this.props.header) ? this.getHeader(this.props.title) : ''
    const colors = ['dark', 'primary', 'info', 'success', 'warning', 'danger']
    let type = ''
    if (colors.indexOf(this.props.type) !== -1) {
      type = 'is-' + this.props.type
    }
    return (
      <article className={classNames(['message', type, style.Message])}>
        {messageHeader}
        <div className='message-body'>
          <p>{this.props.message}</p>
        </div>
      </article>
    )
  }
}

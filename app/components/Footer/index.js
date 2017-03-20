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

import style from './style.scss'
import LocaleToggle from 'containers/LocaleToggle'

export default class Footer extends React.PureComponent {
  render () {
    return (
      <footer className={style.Footer}>
        <div className='control is-horizontal'>
          <div className='control-label'>
            <label className='label'><FormattedMessage {...messages.labelLanguageToggle} />:</label>
          </div>
          <div className='control-body'>
            <div className='control'>
              <div className='select'>
                <LocaleToggle />
              </div>
            </div>
          </div>
          <div className={style.Footer__Author}>
            <div className='control'>
              <a href='https://github.com/rog/kcalc'>kcalc</a> <FormattedMessage {...messages.author} values={{
                author: <a href='https://rog.mx'>Rogelio Alberto</a>, love: <span className={style.Footer__Love}>♥︎</span>}} />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

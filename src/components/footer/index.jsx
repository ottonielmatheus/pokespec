import React from 'react'

import './index.scss'
import GitHubLogo from '../shared/github.png'


function Footer () {
  return (
    <div className='footer'>
      <div className='footer__limit'>
        <a href={'https://github.com/ottonielmatheus'}>
          <img src={GitHubLogo} alt="github" />
          <span>github/ottonielmatheus</span>
        </a>
      </div>
    </div>
  )
}

export default Footer
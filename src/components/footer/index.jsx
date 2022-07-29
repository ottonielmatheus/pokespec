import React from 'react'
import { Link } from 'react-router-dom'
import {  BsGithub, BsLinkedin } from 'react-icons/bs'

import './index.scss'
import projectLogo from './../shared/logos/logo.png'

const currentYear = new Date().getFullYear()

function Footer () {
  return (
    <footer>
      <div className='container'>
        <div className='container__project'>
          <img src={projectLogo} alt='project logo' />
          <p>Consider contribute to project.</p>
          <button>Contribute</button>
        </div>
        <div className='container__nav'>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About</li></Link>
          </ul>
        </div>
        <div className='container__actions'></div>
      </div>
      <div className='footer'>
        <div className='footer__limit'>
          <small>© {currentYear} Pokespec, Inc.</small>
          <div className='footer__limit__social'>
            <a href='https://github.com/ottonielmatheus'>
              <BsGithub size={24} />
            </a>
            <a href='https://www.linkedin.com/in/ottoniel-matheus-de-souza-756a64170/'>
              <BsLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
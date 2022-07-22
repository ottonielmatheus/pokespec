import React from 'react'
import { Link } from 'react-router-dom'
import { BsList } from 'react-icons/bs'

import './index.scss'

import PokeSearch from './../poke-search'

function Header () {
  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__container__limit'>
            <div className='header__container__limit__nav'>
              <div className='header__container__limit__nav__menu'>
                <BsList size={42} color={'#fff'} />
              </div>
              <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
              </ul>
            </div>
          <div className='header__container__limit__search'>
            <PokeSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
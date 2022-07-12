import React from 'react'

import './index.scss'

import PokeSearch from './../poke-search'

function Header () {
  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__container__limit'>
          <div className='header__container__limit__search'>
            <PokeSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
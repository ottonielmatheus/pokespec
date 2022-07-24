import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsList, BsX, BsFillMoonFill, BsFillBrightnessHighFill } from 'react-icons/bs'

import './index.scss'

import PokeSearch from './../poke-search'

function Header () {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const [showMenu, setShowMenu] = useState(false)
  const menu = <>
    <Link to='/' onClick={() => setShowMenu(false)}><li>Home</li></Link>
    <Link to='/about' onClick={() => setShowMenu(false)}><li>About</li></Link>
  </>

  useEffect(() => {
    const html = document.querySelector('html')
    const storedTheme = localStorage.getItem('theme')
    html.setAttribute('data-theme', storedTheme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className={`header${showMenu ? '--expanded' : ''}`}>
      <div className='header__container'>
        <div className='header__container__limit'>
          <div className='header__container__limit__nav'>
            <div className='header__container__limit__nav__menu'>
              <button className='header__container__limit__nav__menu__button'
                onClick={() => setShowMenu(!showMenu)}>
                {
                  showMenu ? <BsX size={42} /> : <BsList size={42} />
                }
              </button>
              <ul className='header__container__limit__nav__menu__list'>{menu}</ul>
            </div>
          </div>
          <div className='header__container__limit__search'>
            <PokeSearch />
          </div>
          <button className='header__container__limit__theme' onClick={toggleTheme}>
            {theme === 'dark' ? <BsFillBrightnessHighFill size={18} /> : <BsFillMoonFill size={18} />}
          </button>
        </div>
        <ul className={'header__container__mobile-menu' + (showMenu ? '--expanded' : '')}>{menu}</ul>
      </div>
    </div>
  )
}

export default Header
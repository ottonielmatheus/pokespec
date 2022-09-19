import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsList, BsX } from 'react-icons/bs'
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle'

import './index.scss'

import PokeSearch from './../poke-search'
import { usePokemonContext } from '../../contexts/pokemon.context'

function Header () {
  const navigate = useNavigate()
  const { theme, setTheme } = usePokemonContext()
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

  const goToPokemon = (id) => {
    navigate(`/pokemons/${id}`)
  }

  return (
    <header className={`header${showMenu ? '--expanded' : ''}`}>
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
            <PokeSearch placeholder='Search pokémon' onSearch={goToPokemon} />
          </div>
          <div className='header__container__limit__theme'>
            <DarkModeToggle mode={theme} size='sm' onChange={toggleTheme} />
          </div>
        </div>
        <ul className={'header__container__mobile-menu' + (showMenu ? '--expanded' : '')}>
          {menu}
          <li className='toggle'>
            Theme
            <DarkModeToggle
              mode={theme}
              size='sm'
              onChange={toggleTheme}
            />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
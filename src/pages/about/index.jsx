import React, { useEffect, useState } from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

import githubApi from './../../core/apis/github.api'

import './index.scss'
import pokeApiLogo from './../../components/shared/logos/pokeapi-logo.png'
import nintendoLogo from './../../components/shared/logos/nintendo-logo.png'
import ashPokemon from './../../components/shared/logos/ash-about.png'


function About () {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    setUser(await githubApi.getUser('ottonielmatheus'))
  }, [])

  return (
    <section className='about'>
      <div className='row'>
        <div className='column'>
          <div className='about__application'>
            <h2>About</h2>
            <div className='about__application__contribute'>
              <p>
                Check attributes, status, abilities, evolutions and characteristics of all pokemons within a click.
                <br /><br />
                This is an application made for <b>educational purposes</b>, and to contribute to the community in some way,
                there is <b>no financial gain involved</b> here.
                <br /><br />
                The application was developed using the <b>React library</b>, consuming the open <b>PokeAPI</b>,
                in addition there are optimization concepts applied, such as lazy load, skeleton, indexedDB and cache.
                <br /><br />
                If you were excited about the application and have software skills, please consider <a href='https://github.com/ottonielmatheus/pokespec'>contribute</a>.
              </p>
            </div>
          </div>
          <div className='about__credits'>
            <div className='poke-api'>
              <a href='https://pokeapi.co/'>
                <img src={pokeApiLogo} alt="poke-api" />
              </a>
              <small>All the Pokémon data you&#39;ll ever need in one place, easily accessible through a modern RESTful API.</small>
            </div>
            <div className='nintendo'>
              <a href='https://www.pokemon.com/us/'>
                <img src={nintendoLogo} alt="nintendo" />
              </a>
              <small>Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.</small>
            </div>
          </div>
        </div>
        <div className='about__me'>
          <h2>Who I am?</h2>
          <div className='about__me__avatar'>
            <img width={150} src={user?.avatar_url} alt="profile picture" />
          </div>
          <div className='about__me__name'>
            <h3>{user?.name}</h3>
            <span>{user?.login}</span>
          </div>
          <p className='about__me__description'>
            <span>{user?.bio.split('\r\n\r\n')[0]}</span>
            <br />
            <br />
            <span>{user?.bio.split('\r\n\r\n')[2]}</span>
          </p>
          <span className='about__me__location'>{user?.location}</span>
          <div className='about__me__links'>
            <a href={user?.html_url}>
              <BsGithub size={32} />
            </a>
            <a href='https://www.linkedin.com/in/ottoniel-matheus-de-souza-756a64170/'>
              <BsLinkedin size={32} />
            </a>
          </div>
          <img className='ash' width={250} src={ashPokemon} alt='ash' />
        </div>
      </div>
    </section>
  )
}

export default About
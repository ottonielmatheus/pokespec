import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

import './index.scss'
import projectLogo from './../../components/shared/logos/logo.png'
import pokeApiLogo from './../../components/shared/logos/pokeapi-logo.png'
import nintendoLogo from './../../components/shared/logos/nintendo-logo.png'
import ashPokemon from './../../components/shared/logos/ash-about.png'
import GitHubUser from './../../components/shared/github-user'


function About () {
  const currentYear = new Date().getFullYear()

  return (
    <section className='about'>
      <div className='row'>
        <div className='column'>
          <div className='about__application'>
            <h2>About</h2>
            <img src={projectLogo} alt='project logo' />
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
              <small>Pokémon and all elements of the Pokémon franchise are © 1995-{currentYear} Nintendo, GAME FREAK inc. TM © and Creatures Inc.</small>
            </div>
          </div>
        </div>
        <div className='about__me'>
          <h2>Who I am?</h2>
          <GitHubUser username={'ottonielmatheus'} />
          <div className='about__me__links'>
            <a href='https://github.com/ottonielmatheus'>
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
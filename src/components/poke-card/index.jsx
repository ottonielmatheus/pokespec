import React, { useEffect, useState } from 'react'
import { GiMale, GiFemale } from 'react-icons/gi'

import './index.scss'
import pokemonLogo from './../shared/logos/pokemon-logo.png'

import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'

function PokeCard ({ name }) {
  const [loading, setLoading] = useState(true)
  const [pokeDetails, setPokeDetails] = useState()

  useEffect(async () => {
    const details = await pokemonApi.pokemons.getByName(name)

    const { formatedName, genre, modifier } = pokemonUtils.formatName(details.name)
    details.name = formatedName
    details.genre = genre
    details.modifier = modifier

    details.types = await pokemonUtils.formatTypes(details.types)
    details.mainAbility = await pokemonUtils.getMainAbility(details.abilities)

    const { weakness, resistance } = await pokemonUtils.getWeaknessAndResistance(details.types)
    details.weakness = weakness
    details.resistance = resistance

    setPokeDetails(details)
    setLoading(false)
  }, [])

  const formatPokeElements = (elements) => {
    let formatedElements = null

    if (!elements.length) {
      return null
    }

    if (elements.length < 4) {
      formatedElements = elements.slice(0, 3).map((type, index) => (
        <img key={index} src={type.icon} alt={type.name} />
      ))
    } else {
      formatedElements = elements.slice(0, 2).map((type, index) => (
        <img key={index} src={type.icon} alt={type.name} />
      ))
      formatedElements.push(
        <span key={formatedElements.length + 1} className='poke-card__elements--more'>+{elements.length - 2}</span>
      )
    }

    return formatedElements
  }

  return (
    loading ? <div className="poke-card__skeleton"><img src={pokemonLogo} alt="pokemon" /></div> :
    <div className={(pokeDetails?.modifier || '') + ' poke-card'}
      style={{ backgroundImage: `url(${pokeDetails?.types[0]?.background})` }}>
      <img className='poke-card__avatar' src={pokeDetails?.sprites?.front_default} />
      <div className='poke-card__name'>
        <span>{pokeDetails?.name}</span>
        {pokeDetails?.genre &&
          <span className='poke-card__genre'>
            {
              pokeDetails?.genre === 'male' ?
                <span className="poke-card__genre--male"><GiMale /></span>
                : <span className="poke-card__genre--female"><GiFemale /></span>
            }
          </span>
        }
      </div>
      {
        pokeDetails?.modifier &&
        <div className='poke-card__modifier' style={{
          backgroundImage: {
            gmax: 'linear-gradient(315deg, #d99058 0%, #f8de7e 74%)',
            mega: 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)',
            'mega-x': 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)',
            'mega-y': 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)',
            'eternamax': 'linear-gradient(315deg, #0cbaba 0%, #380036 74%)'
          }[pokeDetails?.modifier]
        }}>{pokeDetails?.modifier.toUpperCase()}</div>
      }
      <div className='poke-card__types'>
        {pokeDetails?.types?.map((type, index) => (<img key={index} src={type.icon} alt={type.name} />))}
      </div>
      <span className="poke-card__stats--hp">
        <span><small>HP</small> {pokemonUtils.getStatsValue(pokeDetails?.stats, 'hp')}</span>
      </span>
      <div className='poke-card__image'>
        <img
          src={pokeDetails?.sprites?.other['official-artwork']?.front_default}
          alt={pokeDetails?.name} />
      </div>
      <div className='poke-card__elements'>
        <div className='poke-card__elements--resistance'>
          <span className='types'>
            {formatPokeElements(pokeDetails?.resistance)}
          </span>
          <span className='title'>resistance</span>
        </div>
        <div className='poke-card__elements--weakness'>
          <span className='types'>
            {formatPokeElements(pokeDetails?.weakness)}
          </span>
          <span className='title'>weakness</span>
        </div>
      </div>
      <div className='poke-card__ability'
        style={{
          background: `linear-gradient(45deg, rgba(22, 22, 22, .5), ${pokeDetails?.types[0]?.color}, rgba(22, 22, 22, 0))`
        }}>
        <span className='poke-card__ability__title'>Ability</span>
        <span className='poke-card__ability__name'>{pokeDetails?.mainAbility?.name}</span>
        {
          pokeDetails?.mainAbility?.total > 0 &&
          <span className='poke-card__ability__total'>+ {pokeDetails?.mainAbility?.total}</span>
        }
      </div>
      <div className="poke-card__stats">
        <span className="poke-card__stats--attack">
          <span className='value'>
            {pokemonUtils.getStatsValue(pokeDetails?.stats, 'attack')}
          </span>
        </span>
        <span className="poke-card__stats--defense">
          <span className='value'>
            {pokemonUtils.getStatsValue(pokeDetails?.stats, 'defense')}
          </span>
        </span>
        <span className="poke-card__stats--speed">
          <span className='value'>
            {pokemonUtils.getStatsValue(pokeDetails?.stats, 'speed')}
          </span>
        </span>
      </div>
    </div>
  )
}

export default PokeCard
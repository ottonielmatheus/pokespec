import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonUtils from './../../core/pokemon.utils'

import './index.scss'
import PokeType from '../../components/poke-type'
import PokeStats from '../../components/poke-stats'
import PokeBadge from '../../components/poke-badge'

function PokeProfile ({ pokemon, diff, stats = false, shortStats = false, weaknesses = false }) {
  const { loading } = usePokemonContext()
  const [poke, setPoke] = useState()

  useEffect(async () => {
    if (!pokemon) return

    const { formatedName, genre, modifier, region } = pokemonUtils.formatName(pokemon.name)
    pokemon.formatedName = formatedName
    pokemon.genre = genre
    pokemon.modifier = modifier
    pokemon.region = region

    pokemon.types = await pokemonUtils.formatTypes(pokemon.types)

    const { weakness, resistance, immune } = await pokemonUtils.getWeaknessAndResistance(pokemon.types)
    pokemon.weakness = weakness
    pokemon.resistance = resistance
    pokemon.immune = immune

    pokemon.effectiveness = pokemonUtils.getEffectiveness(pokemon.weakness, pokemon.resistance, pokemon.immune)

    setPoke(pokemon)
  }, [pokemon])

  return (
    loading ?
      <div className='poke-profile--skeleton'>
        <ReactLoading className='loading' type='bubbles' />
      </div>
      : <div className='poke-profile'>
          <div className='poke-profile__header'>
            {poke?.formatedName}
            <div className='poke-profile__header__types'>
              {poke?.types?.map((type, index) => (<PokeType key={index} type={type} />))}
            </div>
          </div>
          <div className='poke-profile__body'>
            <div className='poke-profile__body__badges'>
              <div className='poke-profile__body__badges__variations'>
                {poke?.modifier &&
                  <PokeBadge badge={poke?.modifier} />
                }
                {poke?.region &&
                  <PokeBadge badge={poke?.region} />
                }
              </div>
            </div>
            <img alt={poke?.formatedName}
              src={poke?.sprites?.other['official-artwork']?.front_default || poke?.sprites.front_default}
            />
            <div className='poke-profile__body__measures'>
              <span>{(poke?.height * 0.32808).toFixed(1).replace('.0', '')}&quot;</span>
              <span>{Math.round(poke?.weight / 4.536)} lbs</span>
            </div>
            {(stats || shortStats) && <PokeStats short={shortStats} pokemonStats={poke?.stats} diffTo={diff?.stats} />}
          </div>
          {
            weaknesses &&
            <div className='poke-profile__footer'>
              <div className='poke-profile__footer__damage-table'>
                <span>weaknesses</span>
                <div className='poke-profile__footer__damage-table__elements'>
                  <div>
                    <small>x0</small>
                    <div className='elements'>
                      {poke?.effectiveness['0']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x0.25</small>
                    <div className='elements'>
                      {poke?.effectiveness['0.25']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x0.5</small>
                    <div className='elements'>
                      {poke?.effectiveness['0.5']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x2</small>
                    <div className='elements'>
                      {poke?.effectiveness['2']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x4</small>
                    <div className='elements'>
                      {poke?.effectiveness['4']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
  )
}

export default PokeProfile
import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal'

import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import PokeProfileSkeleton from './skeleton'
import PokeType from '../../components/poke-type'
import PokeStats from '../../components/poke-stats'
import PokeEffectiveness from '../poke-effectiveness'
import DefaultPokemonImage from './../shared/default-pokemon-image'
import Power from './../shared/power'

function PokeProfile ({ pokemon, diff, short = false, stats = false, effectiveness = false }) {
  const { loading } = usePokemonContext()
  const [poke, setPoke] = useState()

  useEffect(async () => {
    if (!pokemon) return
    setPoke(pokemon)
  }, [pokemon])

  const pokemonProfile = (pokemon) => (
    <div className='poke-profile__header__pokemon'>
      <div className='poke-profile__header__pokemon__avatar'>
        <DefaultPokemonImage
          className='poke-profile__header__pokemon__avatar__background'
          type={(diff && short) ? 'versus' : 'default'} />
        {
          pokemon?.avatar.any &&
          <img className='poke-profile__header__pokemon__avatar__image' alt={pokemon?.formatedName} src={pokemon?.avatar.any}/>
        }
      </div>
      <Fade spy={diff} right={!short} left={short} distance='5%'>
        <div className='poke-profile__header__pokemon__basics'>
          <div className='poke-profile__header__pokemon__basics__types'>
            {pokemon?.types?.map((type, index) => (<PokeType key={index} type={type} hiddeLabel={short} />))}
          </div>
          <span className='poke-profile__header__pokemon__basics__name'>
            <h1>
              <span className='formated-name'>{pokemon?.formatedName}</span>
              {
                (pokemon?.modifier || pokemon?.region) &&
                <span className='modifier'>
                  {pokemon?.modifier?.toUpperCase()}
                  {pokemon?.region?.toUpperCase()}
                </span>
              }
            </h1>
          </span>
          {
            !short &&
            <>
              <span className='poke-profile__header__pokemon__basics__identifier'>
                <span>#{pokemon?.number || '000'}</span>
                <span className='original-name'>{pokemon?.species?.originalName}</span>
              </span>
              <div className='poke-profile__header__pokemon__basics__overall'>
                <span>Overall</span>
                <span>{pokemon?.stats.overall.baseValue || 0}</span>
              </div>
              <div className='poke-profile__header__pokemon__basics__overall-power'>
                <Power value={pokemon?.stats.overall.baseValue} max={255 * 6} />
              </div>
            </>
          }
        </div>
      </Fade>
    </div>
  )

  return (
    loading
      ? <PokeProfileSkeleton short={short} />
      : <div className={`poke-profile${short ? '--short' : ''}`}>
          <div className='poke-profile__header'>
            {pokemonProfile(poke)}
          </div>
          <div className='poke-profile__body'>
            {
              stats &&
              <PokeStats short={short}
                type={short ? 'bar' : 'radar'}
                pokemon={pokemon}
                diffTo={diff}
              />
            }
            {effectiveness && <PokeEffectiveness short={short} effectiveness={poke?.effectiveness} />}
          </div>
        </div>
  )
}

export default PokeProfile
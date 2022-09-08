import React, { useEffect, useState } from 'react'

import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import PokeProfileSkeleton from './skeleton'
import PokeType from '../../components/poke-type'
import PokeStats from '../../components/poke-stats'
import PokeEffectiveness from '../poke-effectiveness'
import DefaultPokemonImage from './../shared/default-pokemon-image'

function PokeProfile ({ pokemon, diff, short = false, stats = false, weaknesses = false }) {
  const { loading } = usePokemonContext()
  const [poke, setPoke] = useState()

  useEffect(async () => {
    if (!pokemon) return
    setPoke(pokemon)
  }, [pokemon])

  return (
    loading
      ? <PokeProfileSkeleton />
      : <div className={`poke-profile ${short ? 'short' : ''}`}>
          <div className='poke-profile__header'>
            <div className='poke-profile__header__avatar'>
              <DefaultPokemonImage className='poke-profile__header__avatar__background' />
              {poke?.avatar.any && <img className='poke-profile__header__avatar__image' alt={poke?.formatedName} src={poke?.avatar.any}/>}
            </div>
            <div className='poke-profile__header__pokemon'>
              <div className='poke-profile__header__pokemon__types'>
                {poke?.types?.map((type, index) => (<PokeType key={index} type={type} />))}
              </div>
              <span className='poke-profile__header__pokemon__name'>
                <h1>
                  <span className='formated-name'>{poke?.formatedName}</span>
                  {
                    (poke?.modifier || poke?.region) &&
                    <span className='modifier'>
                      {poke?.modifier?.toUpperCase()}
                      {poke?.region?.toUpperCase()}
                    </span>
                  }
                </h1>
              </span>
              {
                !short &&
                <>
                  <span className='poke-profile__header__pokemon__identifier'>
                    <span>#{poke?.number || '000'}</span>
                    <span className='original-name'>{poke?.species?.originalName}</span>
                  </span>
                  <div className='poke-profile__header__pokemon__overall'>
                    <span>Overall</span>
                    <span>{poke?.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</span>
                  </div>
                </>
              }
            </div>
          </div>
          <div className='poke-profile__body'>
            {
              stats &&
              <PokeStats
                short={short}
                type={short ? 'bar' : 'radar'}
                pokemonStats={poke?.stats}
                pokemonTypes={poke?.types}
                diffTo={diff?.stats}
              />
            }
            {weaknesses && <PokeEffectiveness effectiveness={poke?.effectiveness} />}
          </div>
        </div>
  )
}

export default PokeProfile
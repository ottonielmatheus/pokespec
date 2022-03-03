import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import './index.scss'
import PercentageBar from '../shared/percentage-bar'


function PokeShape ({ pokemonSpecies }) {
  const [pokeSpecies, usePokeSpecies] = useState()

  useEffect(async () => {
    usePokeSpecies(pokemonSpecies)
  }, [pokemonSpecies])

  return (
    <div className='pokemon-shape'>
      <div className='pokemon-shape__head'>
        <span className='pokemon-shape__head__title'>Details</span>
      </div>
      <div className='pokemon-shape__body'>
        <img width={70} height={70} src={pokeSpecies?.shape.image} alt={pokeSpecies?.shape.name} />
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Shape</span>
        <span>{pokeSpecies?.shape.name?.replaceAll('-', ' ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Habitat</span>
        <span>{_.capitalize(pokeSpecies?.habitat.name).replaceAll('-', ' ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Happiness</span>
        <PercentageBar className='pokemon-stats__bar' color='#ffd700' value={pokeSpecies?.happiness.percentage} />
        <span className='pokemon-shape__row__value'>{Number(pokeSpecies?.happiness.percentage).toFixed(0)}%</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Catch rate</span>
        <PercentageBar className='pokemon-stats__bar' color='#0a75ad' value={pokeSpecies?.captureRate} />
        <span className='pokemon-shape__row__value'>{Number(pokeSpecies?.captureRate).toFixed(0)}%</span>
      </div>
    </div>
  )
}

export default PokeShape
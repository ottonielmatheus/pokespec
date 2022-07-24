import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import './index.scss'
import PokeShapeSkeleton from './skeleton'
import PercentageBar from '../shared/percentage-bar'

import { usePokemonContext } from '../../contexts/pokemon.context'


function PokeShape ({ pokemonSpecies }) {
  const { loading: rootLoading } = usePokemonContext()
  const [pokeSpecies, usePokeSpecies] = useState()

  useEffect(async () => {
    usePokeSpecies(pokemonSpecies)
  }, [pokemonSpecies])

  return rootLoading ? <PokeShapeSkeleton /> : (
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
        <span className='pokemon-shape__row__title'>Name</span>
        <span>{pokeSpecies?.originalName || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Color</span>
        <span>{_.capitalize(pokeSpecies?.shape.color) || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Habitat</span>
        <span>{_.capitalize(pokeSpecies?.habitat.name).replaceAll('-', ' ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Growth</span>
        <span>{pokeSpecies?.growthRate.replaceAll('-', ' ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Catch rate</span>
        <PercentageBar className='pokemon-stats__bar' color='rgb(30 158 225)' value={pokeSpecies?.captureRate} />
        <span className='pokemon-shape__row__value'>{Number(pokeSpecies?.captureRate).toFixed(0)}%</span>
      </div>
    </div>
  )
}

export default PokeShape
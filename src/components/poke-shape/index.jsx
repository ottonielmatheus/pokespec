import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import './index.scss'
import PokeShapeSkeleton from './skeleton'
import PokeHabitat from '../../components/poke-habitat'

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
      <PokeHabitat habitat={pokeSpecies?.habitat}>
        <div className='pokemon-shape__row'>
          <span className='pokemon-shape__row__title'>Habitat</span>
          <span>{_.capitalize(pokeSpecies?.habitat.name).replaceAll('-', ' ') || '???'}</span>
        </div>
      </PokeHabitat>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Generation</span>
        <span>{pokeSpecies?.generation || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Genus</span>
        <span>{pokeSpecies?.genus || '???'}</span>
      </div>
      <div className='pokemon-shape__row__column'>
        <span className='pokemon-shape__row__column__title'>Description</span>
        <span>{pokeSpecies?.about || '???'}</span>
      </div>
    </div>
  )
}

export default PokeShape
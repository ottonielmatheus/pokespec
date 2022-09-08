import React, { useEffect, useState } from 'react'
import { capitalize } from 'lodash'
import Tippy from '@tippyjs/react'

import './index.scss'
import PokeShapeSkeleton from './skeleton'

import { usePokemonContext } from '../../contexts/pokemon.context'


function PokeShape ({ pokemon, pokemonSpecies }) {
  const { loading: rootLoading } = usePokemonContext()
  const [pokeSpecies, usePokeSpecies] = useState()

  useEffect(async () => {
    usePokeSpecies(pokemonSpecies)
  }, [pokemonSpecies])

  return rootLoading ? <PokeShapeSkeleton /> : (
    <div className='pokemon-shape'>
      <div className='pokemon-shape__row__image'>
        <span className='pokemon-shape__row__image__title-value'>
          <span>Shape</span>
          <span>{pokeSpecies?.shape.name?.replaceAll('-', ' ') || '???'}</span>
        </span>
        <img width={70} height={70} src={pokeSpecies?.shape.image} alt={pokeSpecies?.shape.name} />
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Generation</span>
        <span>{pokeSpecies?.generation || '???'}</span>
      </div>
      {
        pokeSpecies?.characteristic &&
        <div className='pokemon-shape__row'>
          <span className='pokemon-shape__row__title'>Characteristic</span>
          <span>{pokeSpecies?.characteristic.name || '???'}</span>
        </div>
      }
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Height</span>
        <span>{pokemon?.height && (pokemon?.height / 10).toFixed(1).replace('.0', '')}m</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Weight</span>
        <span>{pokemon?.weight && Math.round(pokemon?.weight / 10)}kg</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Habitat</span>
        <span>{capitalize(pokeSpecies?.habitat.name).replaceAll('-', ' ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Park</span>
        <span>{pokeSpecies?.parks.join(', ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Color</span>
        <span>{pokeSpecies?.shape.color || '???'}</span>
      </div>
      <div className='pokemon-shape__row'>
        <span className='pokemon-shape__row__title'>Growth rate</span>
        <span>{pokeSpecies?.growthRate.replaceAll('-', ' ') || '???'}</span>
      </div>
      <div className='pokemon-shape__row__tags'>
        <span className='pokemon-shape__row__title'>Eggs</span>
        <div>
          {
            pokeSpecies?.eggs.length
              ? pokeSpecies?.eggs.map((egg, index) => (
                <Tippy key={index} content={egg}>
                  <span className='egg' key={index} style={{
                    backgroundColor: {
                      'monster': '#D25064',
                      'humanshape': '#D29682',
                      'bug': '#AAC22A',
                      'water1': '#97B5FD',
                      'water2': '#729AFA',
                      'water3': '#5876BE',
                      'mineral': '#7A6252',
                      'flying': '#B29AFA',
                      'indeterminate': '#8A8A8A',
                      'ground': '#E0C068',
                      'fairy': '#FFC8F0',
                      'ditto': '#A664BF',
                      'plant': '#82D25A',
                      'dragon': '#7A42FF',
                      'no-eggs': '#474747',
                      'unknown': '#0080C0'
                    }[egg]
                  }}></span>
                </Tippy>
              ))
              : '???'
          }
        </div>
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
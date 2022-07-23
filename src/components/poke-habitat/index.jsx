import React, { useEffect, useState } from 'react'
import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import PokeHabitatSkeleton from './skeleton'

function PokeHabitat ({ pokemonHabitat, children }) {
  const { loading: rootLoading } = usePokemonContext()
  const [pokeHabitat, usePokeHabitat] = useState()

  useEffect(async () => {
    usePokeHabitat(pokemonHabitat)
  }, [pokemonHabitat])

  return rootLoading ? <PokeHabitatSkeleton /> : (
    <div className='pokemon-habitat primary-box'
      style={{ backgroundImage: `url(${pokeHabitat?.image})` }}>
      <div className={`pokemon-habitat__blackground habitat-${pokeHabitat?.name}`}>
        <div className='pokemon-habitat__blackground__body'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PokeHabitat
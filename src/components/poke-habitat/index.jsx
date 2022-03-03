import React, { useEffect, useState } from 'react'

import './index.scss'

function PokeHabitat ({ pokemonHabitat, children }) {
  const [pokeHabitat, usePokeHabitat] = useState()

  useEffect(async () => {
    usePokeHabitat(pokemonHabitat)
  }, [pokemonHabitat])

  return (
    <div className='pokemon-habitat' style={{ backgroundImage: `url(${pokeHabitat?.image})` }}>
      <div className='pokemon-habitat__blackground'>
        <div className='pokemon-habitat__blackground__body'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PokeHabitat
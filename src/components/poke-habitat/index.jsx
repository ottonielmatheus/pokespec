import React, { useEffect, useState } from 'react'
import './index.scss'

function PokeHabitat ({ habitat, children }) {
  const [pokeHabitat, usePokeHabitat] = useState()

  useEffect(async () => {
    usePokeHabitat(habitat)
  }, [habitat])

  return (
    <div className='pokemon-habitat'
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
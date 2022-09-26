import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import { capitalize } from 'lodash'

import 'tippy.js/dist/tippy.css'
import './index.scss'
import { formatType } from '../../core/pokemon.utils'


function PokeType ({ type, hiddeLabel }) {
  const [pokemonType, setPokemonType] = useState()

  useEffect(async () => {
    if ('icon' in type) {
      setPokemonType(type)
    } else {
      setPokemonType(await formatType(type))
    }
  }, [type])

  return (
    <Tippy
      className={`tippy-tooltip-type${hiddeLabel ? '--hidden' : ''} ${pokemonType?.name}-theme`}
      arrow={false}
      content={
        <div>
          <span>{capitalize(pokemonType?.name)}</span>
        </div>
      }
      >
      <div className='pokemon-types'>
        <img src={pokemonType?.icon} alt={pokemonType?.name} />
      </div>
    </Tippy>
  )
}

export default PokeType

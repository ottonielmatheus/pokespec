import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import _ from 'lodash'

import 'tippy.js/dist/tippy.css'
import './index.scss'
import pokemonUtils from '../../core/pokemon.utils'


function PokeType ({ type }) {
  const [pokemonType, setPokemonType] = useState()

  useEffect(async () => {
    if ('icon' in type) {
      setPokemonType(type)
    } else {
      setPokemonType(await pokemonUtils.formatType(type))
    }
  }, [type])

  return (
    <Tippy
      className={`tippy-tooltip-type ${pokemonType?.name}-theme`}
      arrow={false}
      content={
        <div>
          <span>{_.capitalize(pokemonType?.name)}</span>
        </div>
      }
      >
      <img width={30} height={30} src={pokemonType?.icon} alt={pokemonType?.name} />
    </Tippy>
  )
}

export default PokeType

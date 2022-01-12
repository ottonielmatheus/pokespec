import React, { useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import { useState } from 'react/cjs/react.development'
import ReactLoading from 'react-loading'

import './index.scss'

import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'

function PokeAbilities ({ pokemonAbilities }) {
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeAbilities, setPokeAbilities] = useState()

  useEffect(async () => {
    await getAbilitiesDetails(pokemonAbilities?.slice(0, 2))
  }, [pokemonAbilities])

  const getAbilitiesDetails = async (abilities, isToAppend = false) => {
    setLoadingMore(true)

    if (!abilities) return

    const requests = abilities.map(item => pokemonApi.abilities.getByName(item.ability.name))
    abilities = await Promise.all(requests)

    const formatedAbilities = pokemonUtils.formatAbilities(abilities)
    setPokeAbilities(formatedAbilities)

    if (isToAppend) {
      setPokeAbilities(pokeAbilities.concat(formatedAbilities))
    } else {
      setPokeAbilities(formatedAbilities)
    }

    setLoadingMore(false)
  }

  return (
    <div className='poke-abilities'>
      <div className='poke-abilities__header'>
        <span>Abilities</span>
        <span className='total-items'>{pokeAbilities?.length || 0}/{pokemonAbilities?.length}</span>
      </div>
      <div className='poke-abilities__body'>
        {pokeAbilities?.map((ability, index) => (
          <Fade key={index}>
            <div className='ability'>
              <span className='ability-name'>{ability.name}</span>
              <span className='ability-description'>{ability.shortDescription}</span>
            </div>
          </Fade>
        ))}
        {
          loadingMore ? <div className='loading-more'><ReactLoading type='bubbles' color='#2e2e2e' /></div> :
          (pokeAbilities?.length < pokemonAbilities?.length) &&
          <div className='load-more'
            onClick={async () =>
              await getAbilitiesDetails(pokemonAbilities?.slice(pokeAbilities.length, pokeAbilities.length + 1), true)
            }>
            <small>load more</small>
          </div>
        }
      </div>
    </div>
  )
}

export default PokeAbilities
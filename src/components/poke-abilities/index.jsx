import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'
import { sortBy } from 'lodash'

import './index.scss'
import PokeMovesSkeleton from './../poke-moves/skeleton'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'

function PokeAbilities ({ pokemonAbilities }) {
  const { loading: rootLoading } = usePokemonContext()
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeAbilities, setPokeAbilities] = useState()

  useEffect(async () => {
    const abilities = sortBy(pokemonAbilities, [item => item.ability.name])
    await getAbilitiesDetails(abilities?.slice(0, 3))
  }, [pokemonAbilities])

  const getAbilitiesDetails = async (abilities, isToAppend = false) => {
    setLoadingMore(true)

    if (!abilities) return

    const requests = abilities.map(async item => {
      const detailedAbility = await pokemonApi.abilities.getByName(item.ability.name)
      return {
        ...detailedAbility,
        hidden: item.is_hidden
      }
    })
    abilities = await Promise.all(requests)
    setPokeAbilities(abilities)

    if (isToAppend) {
      setPokeAbilities(pokeAbilities.concat(abilities))
    } else {
      setPokeAbilities(abilities)
    }

    setLoadingMore(false)
  }

  return rootLoading ? <PokeMovesSkeleton /> : (
    <div className='poke-abilities'>
      <div className='poke-abilities__header'>
        <span>Abilities</span>
        <span className='total-items'>{pokeAbilities?.length || 0}/{pokemonAbilities?.length}</span>
      </div>
      <div className='poke-abilities__body'>
        {pokeAbilities?.map((ability, index) => (
          <Fade key={index}>
            <div className='ability'>
              <div className='ability-header'>
                <span className='ability-name'>{ability.name}</span>
                {ability.hidden && <small className='ability-visibility'>hidden</small>}
              </div>
              <span className='ability-description'>{ability.shortDescription || <i>nothing about.</i>}</span>
            </div>
          </Fade>
        ))}
        {
          loadingMore ? <div className='loading-more'><ReactLoading className='loading' type='bubbles' /></div> :
          (pokeAbilities?.length < pokemonAbilities?.length) &&
          <div className='load-more'
            onClick={async () => {
              const currentAbilitiesPage = pokemonAbilities?.slice(pokeAbilities.length, pokeAbilities.length + 1)
              await getAbilitiesDetails(currentAbilitiesPage, true)
            }}>
            <small>load more</small>
          </div>
        }
      </div>
    </div>
  )
}

export default PokeAbilities
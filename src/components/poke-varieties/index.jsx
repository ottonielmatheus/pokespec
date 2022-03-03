import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

import './index.scss'
import PokeBadge from '../poke-badge'

import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'


function PokeVarieties ({ pokemonVarieties }) {
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeVarieties, setPokeVarieties] = useState()

  useEffect(async () => {
    await getVarietiesDetails(pokemonVarieties?.slice(0, 5))
  }, [pokemonVarieties])

  const getVarietiesDetails = async (varieties, isToAppend = false) => {
    setLoadingMore(true)

    if (!varieties) return

    const requests = varieties.map(async variety => {
      const detailedItem = await pokemonApi.pokemons.getByUrl(variety.pokemon.url)
      return detailedItem
    })
    varieties = await Promise.all(requests)

    const formatedVarieties = pokemonUtils.formatVarieties(varieties)
    setPokeVarieties(formatedVarieties)

    if (isToAppend) {
      setPokeVarieties(pokeVarieties.concat(formatedVarieties))
    } else {
      setPokeVarieties(formatedVarieties)
    }

    setLoadingMore(false)
  }

  return (
    <div className='poke-varieties'>
      <div className='poke-varieties__header'>
        <span>Varieties</span>
        <span className='total-items'>{pokeVarieties?.length || 0}/{pokemonVarieties?.length}</span>
      </div>
      <div className='poke-varieties__body'>
        {pokeVarieties?.map((pokemon, index) => (
          <Fade key={index} left>
            <div className='variety'>
              <div className='variety__pokemon'>
                <Link to={`/pokemons/${pokemon.name}`}>
                  <img alt={pokemon.name}
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  />
                </Link>
              </div>
              <div className='variety__badges'>
                {pokemon.badges.region && <PokeBadge badge={pokemon.badges.region} />}
                {pokemon.badges.modifier && <PokeBadge badge={pokemon.badges.modifier} />}
              </div>
            </div>
          </Fade>
        ))}
        {
          loadingMore ? <div className='loading-more'><ReactLoading type='bubbles' color='#2e2e2e' /></div> :
          (pokeVarieties?.length < pokemonVarieties?.length) &&
          <div className='variety load-more'
            onClick={async () => {
              const currentVarietiesPage = pokemonVarieties?.slice(pokeVarieties.length, pokeVarieties.length + 5)
              await getVarietiesDetails(currentVarietiesPage, true)
            }}>
            <strong>+</strong>
          </div>
        }
      </div>
    </div>
  )
}

export default PokeVarieties
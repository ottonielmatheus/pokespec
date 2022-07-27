import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'

import './index.scss'
import PokeVarietiesSkeleton from './skeleton'
import PokeProfile from '../poke-profile'


function PokeVarieties ({ pokemon, pokemonVarieties }) {
  const { loading: rootLoading } = usePokemonContext()
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeVarieties, setPokeVarieties] = useState()

  useEffect(async () => {
    await getVarietiesDetails(pokemonVarieties?.slice(0, 5))
  }, [pokemonVarieties])

  const getVarietiesDetails = async (varieties, isToAppend = false) => {
    setLoadingMore(true)

    if (!varieties) return

    const requests = varieties
      .map(async variety => {
        if (pokemon.name === variety.pokemon.name) return pokemon
        return pokemonApi.pokemons.getByUrl(variety.pokemon.url)
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

  return rootLoading ? <PokeVarietiesSkeleton /> : (
    <div className='poke-varieties'>
      <div className='poke-varieties__header'>
        <span>Varieties</span>
        <span className='total-items'>{pokeVarieties?.length || 0}/{pokemonVarieties?.length}</span>
      </div>
      <div className='poke-varieties__body'>
        {pokeVarieties?.map((variety, index) => (
          <Fade key={index} left>
            <div className='variety'>
              <Link to={`/pokemons/${variety.name}`}>
                <PokeProfile shortStats pokemon={variety} diff={pokemon} />
              </Link>
            </div>
          </Fade>
        ))}
        {
          loadingMore ? <div className='loading-more'>
            <ReactLoading className='loading' type='spin' width={50} height={50} />
          </div>
          : (pokeVarieties?.length < pokemonVarieties?.length) &&
            <Fade left>
              <div className='variety load-more'
                onClick={async () => {
                  const currentVarietiesPage = pokemonVarieties?.slice(pokeVarieties.length, pokeVarieties.length + 3)
                  await getVarietiesDetails(currentVarietiesPage, true)
                }}>
                <strong>+</strong>
              </div>
            </Fade>
        }
      </div>
    </div>
  )
}

export default PokeVarieties
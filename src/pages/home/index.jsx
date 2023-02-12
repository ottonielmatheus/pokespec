import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'

import { store } from './../../core/storage'
import pokemonApi from '../../core/apis/pokemon.api'
import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import CustomSearch from '../../components/shared/inputs/custom-search'
import PokemonList from '../../components/pokemon-list'

function Home () {
  const { loading, setLoading } = usePokemonContext()

  const limit = 30
  const [pokemons, setPokemons] = useState([])
  const [skip, setSkip] = useState(0)
  const [query, setQuery] = useState({})
  const [hasMore, setHasMore] = useState(true)

  useEffect(async () => {
    setLoading(true)
    await searchPokemons(query, { skip, limit })
    setLoading(false)
  }, [query])

  const searchPokemons = async (where, { skip, limit }) => {
    const result = await pokemonApi.pokemons.search(where, { limit, skip })

    setPokemons(result)
    storePokemons(pokemons)
    setSkip(skip + result.length)
    setHasMore(result.length > 0)
  }

  const storePokemons = async (pokemons) => {
    Promise.all(pokemons.map(store('pokemonsSearch').add))
  }

  const loadMore = async () => {
    const result = await pokemonApi.pokemons.search(query, { limit, skip })

    setPokemons(pokemons.concat(result))
    setSkip(skip + result.length)
    setHasMore(result.length > 0)
  }

  const filterPokemonBy = debounce(async (field, op, value) => {
    const newQuery = {}
    newQuery[field] = {}
    newQuery[field]['_' + op] = value
    setSkip(0)
    setQuery({ ...query, ...newQuery })
  }, 300)

  return (
    <section className='home'>
      <div className='home__top'>
      </div>
      <div className='home__pokemons'>
        <div className='home__pokemons__header'>
          <CustomSearch placeholder='Type here to filter pokémons' onChange={e => filterPokemonBy('name', 'ilike', e.target.value.trim() + '%')} />
        </div>
        <div className='home__pokemons__body'>
          <PokemonList pokemons={pokemons} loadMore={loadMore} hasMore={hasMore} />
          {!loading && !pokemons.length && <h3 className='home__pokemons__body__not-found'>No pokémons found for this search.</h3>}
        </div>
      </div>
    </section>
  )
}

export default Home

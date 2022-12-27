import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import InfiniteScroll from 'react-infinite-scroll-component'

import { store } from './../../core/storage'
import pokemonApi from '../../core/apis/pokemon.api'

import './index.scss'
import PokePortrait from '../../components/poke-portrait'
import CustomSearch from '../../components/shared/inputs/custom-search'

function Home () {
  const [nextPage, setNextPage] = useState()
  const [pokemons, setPokemons] = useState([])
  const [totalPokemons, setTotalPokemons] = useState(0)

  useEffect(async () => {
    await searchPokemons(0, 30)
  }, [])

  const searchPokemons = async ({ skip, limit, next }) => {
    const res = await pokemonApi.pokemons.getAll({ skip, limit, next })

    setNextPage(res.next)
    setTotalPokemons(res.count)
    setPokemons(pokemons.concat(res.results))
    storePokemons(pokemons)
  }

  const storePokemons = async (pokemons) => {
    Promise.all(pokemons.map(store('pokemonsSearch').add))
  }

  const loadMore = async () => {
    await searchPokemons({ next: nextPage })
  }

  return (
    <section className='home'>
      <div className='home__top'>
      </div>
      <div className='home__pokemons'>
        <div className='home__pokemons__header'>
          <CustomSearch placeholder='Type here to filter pokémons' onKeyDown={console.log} />
        </div>
        <div className='home__pokemons__body'>
          <InfiniteScroll className='home__pokemons__list'
            next={loadMore}
            dataLength={pokemons.length}
            hasMore={pokemons.length < totalPokemons}>
              {
                pokemons.map((pokemon, index) => (
                  <Fade key={index} bottom>
                    <PokePortrait pokemonName={pokemon.name} />
                  </Fade>
                ))
              }
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}

export default Home

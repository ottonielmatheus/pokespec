import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import InfiniteScroll from 'react-infinite-scroll-component'

import './index.scss'

import pokemonApi from '../../core/apis/pokemon.api'
import PokeCard from '../../components/poke-card'


function Home () {
  const navigate = useNavigate()

  const [nextPage, setNextPage] = useState()
  const [pokemons, setPokemons] = useState([])
  const [totalPokemons, setTotalPokemons] = useState(0)

  useEffect(async () => {
    await searchPokemons(0, 20)
  }, [])

  const searchPokemons = async ({ skip, limit, next }) => {
    const res = await pokemonApi.pokemons.getAll({ skip, limit, next })

    setNextPage(res.next)
    setTotalPokemons(res.count)
    setPokemons(pokemons.concat(res.results))
  }

  const loadMore = async () => {
    await searchPokemons({ next: nextPage })
  }

  const getDetailsFromPokemon = (pokemonName) => {
    navigate(`/pokemons/${pokemonName}`)
  }

  return (
    <section>
      <div id="home">
        <InfiniteScroll className='poke-cards'
          next={loadMore}
          dataLength={pokemons.length}
          hasMore={pokemons.length < totalPokemons}>
            {
              pokemons.map((pokemon, index) => (
                <Fade key={index} bottom>
                  <div onClick={() => getDetailsFromPokemon(pokemon.name)}>
                    <PokeCard name={pokemon.name} />
                  </div>
                </Fade>
              ))
            }
        </InfiniteScroll>
      </div>
    </section>
  )
}

export default Home

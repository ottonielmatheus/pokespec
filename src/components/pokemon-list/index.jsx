import React from 'react'
import Fade from 'react-reveal/Fade'
import InfiniteScroll from 'react-infinite-scroll-component'

import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import PokemonListSkeleton from './skeleton'
import PokePortrait from '../../components/poke-portrait'


export default function PokemonList ({ pokemons, hasMore, loadMore }) {
  const { loading } = usePokemonContext()

  return loading ? <PokemonListSkeleton />
    : <InfiniteScroll className='pokemon-list'
        next={loadMore}
        dataLength={pokemons.length}
        hasMore={hasMore}>
          {
            pokemons.map((pokemon, index) => (
              <Fade key={index} bottom>
                <PokePortrait pokemonName={pokemon.name} />
              </Fade>
            ))
          }
      </InfiniteScroll>
}
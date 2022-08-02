import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Fade from 'react-reveal/Fade'

import pokemonApi from '../../core/apis/pokemon.api'
import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import PokeEvolutionsSkeleton from './skeleton'
import DefaultPokemonImage from './../shared/default-pokemon-image'

function PokeEvolutions ({ pokemonEvolutions, pokemon }) {
  const { loading: rootLoading } = usePokemonContext()
  const [pokeEvolutions, setPokeEvolutions] = useState()

  useEffect(async () => {
    const evolutions = await downloadEvolutions(pokemonEvolutions)
    setPokeEvolutions(evolutions)
  }, [pokemonEvolutions])

  const downloadEvolutions = async (chain) => {
    if (!chain?.pokemon?.name) {
      return {}
    }

    const regionPokemonName = chain.pokemon.name + (pokemon.region ? `-${pokemon.region}` : '')

    if (pokemon?.name === regionPokemonName) {
      chain.pokemon = pokemon
    } else {
      chain.pokemon = await pokemonApi.pokemons.getByName(regionPokemonName)
        || await pokemonApi.pokemons.getByName(chain.pokemon.name)
    }

    chain.next = await Promise.all(chain.next.map(downloadEvolutions))
    return chain
  }

  const generatePokeEvolutionTree = (chain) => {
    if (!chain) return
    return (
      <Fade left>
        <div className='evolution-node'>
          <div className='evolution-node-pokemon'>
            <Link to={`/pokemons/${chain?.pokemon?.name}`}>
              {chain?.pokemon?.avatar.any ?
                <img src={chain?.pokemon?.avatar.any} alt={chain?.pokemon?.name} />
                : <DefaultPokemonImage className='default' />
              }
            </Link>
          </div>
          <div className='evolution-node-arrow'>
            {
              (chain.next?.length > 0) &&
              <BsArrowRight size={18} />
            }
          </div>
          <div className='evolution-node-nexts'>
            {
              chain.next?.map((chain, index) => (
                <div key={index}>
                    {generatePokeEvolutionTree(chain)}
                </div>
              ))
            }
          </div>
        </div>
      </Fade>
    )
  }

  return rootLoading ? <PokeEvolutionsSkeleton /> : (
    <div className='poke-evolutions'>
      <div className='poke-evolutions__header'>
        <span>Evolutions</span>
      </div>
      <div className='poke-evolutions__body'>
        {generatePokeEvolutionTree(pokeEvolutions)}
      </div>
    </div>
  )
}

export default PokeEvolutions
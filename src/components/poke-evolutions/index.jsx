import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Fade from 'react-reveal/Fade'

import './index.scss'
import PokeEvolutionsSkeleton from './skeleton'


import pokemonApi from '../../core/apis/pokemon.api'
import { usePokemonContext } from '../../contexts/pokemon.context'

function PokeEvolutions ({ pokemonEvolutions, pokemon }) {
  const { loading: rootLoading } = usePokemonContext()
  const [pokeEvolutions, setPokeEvolutions] = useState()

  useEffect(async () => {
    const evolutions = await downloadEvolutions(pokemonEvolutions)
    setPokeEvolutions(evolutions)
  }, [pokemonEvolutions])

  const downloadEvolutions = async (chain) => {
    if (!chain) return {}
    if (pokemon?.name === chain.pokemon.name) {
      chain.pokemon = pokemon
    } else {
      chain.pokemon = await pokemonApi.pokemons.getById(chain.pokemon.id)
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
              <img src={chain.pokemon?.sprites.other['official-artwork'].front_default} alt={chain?.pokemon?.name} />
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Fade from 'react-reveal/Fade'
import Tippy from '@tippyjs/react'
import { followCursor } from 'tippy.js'

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

    if ([regionPokemonName, chain.pokemon.name].includes(pokemon?.name)) {
      chain.pokemon = pokemon
    } else {
      const chainPokemonName = chain.pokemon.name
      chain.pokemon = await pokemonApi.pokemons.getByName(regionPokemonName)
        || await pokemonApi.pokemons.getByName(chainPokemonName)

      if (!chain.pokemon && pokemon?.name.includes(chainPokemonName)) {
        chain.pokemon = pokemon
      }
    }

    if (chain.evolves.trigger === 'use-item' && chain.evolves.withItem?.url) {
      chain.evolves.withItem = await pokemonApi.items.getByUrl(chain.evolves.withItem.url)
    }

    console.log(chain.evolves)

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
              <Fade>
                <Tippy className={`tippy-tooltip evolution-theme${chain.evolves?.trigger ? '' : '--first-node'}`}
                  plugins={[followCursor]}
                  followCursor={true}
                  arrow={false}
                  placement='bottom'
                  content={
                    <div className='evolves'>
                      <div className='trigger'>
                        <span>on</span>
                        {{
                          'level-up': <strong>level up</strong>,
                          'use-item': <strong>use item</strong>,
                          'trade': <strong>trade</strong>,
                          'take-damage': <strong>take damage</strong>
                        }[chain.evolves?.trigger]}
                      </div>
                      <div className='extra'>
                        {
                          chain.evolves?.trigger === 'level-up' && chain.evolves?.onLevel &&
                          <span>to <strong>{chain.evolves?.onLevel}</strong></span>
                        }
                        {
                          chain.evolves?.trigger === 'use-item' &&
                          <span className='extra--use-item'>
                            <img src={chain.evolves.withItem?.image} alt={chain.evolves?.withItem?.name} />
                            &nbsp;
                            <strong>{chain.evolves.withItem?.name}</strong>
                          </span>
                        }
                      </div>
                    </div>
                  }>
                  {chain?.pokemon?.avatar.any ?
                    <img width={5} height={5} src={chain?.pokemon?.avatar.any} alt={chain?.pokemon?.name} />
                    : <DefaultPokemonImage className='default' />
                  }
                </Tippy>
              </Fade>
            </Link>
          </div>
          <div className='evolution-node-arrow'>
            {(chain.next?.length > 0) && <BsArrowRight size={18} />}
          </div>
          <div className='evolution-node-nexts'>
            {
              chain.next?.map((chain, index) => (
                <div key={index}>{generatePokeEvolutionTree(chain)}</div>
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
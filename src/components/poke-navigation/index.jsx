import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import ReactLoading from 'react-loading'
import { capitalize, padStart } from 'lodash'

import { store } from '../../core/storage'
import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'
import { setPageTitle, setPageIcon } from './../../core/browserfy.utils'

import './index.scss'
import PokeNavigationSkeleton from './skeleton'


function PokeNavigation ({ current }) {
  const navigate = useNavigate()

  const { loading: rootLoading } = usePokemonContext()
  const [loading, setLoading] = useState(false)
  const [previousPokemon, setPreviousPokemon] = useState()
  const [currentPokemon, setCurrentPokemon] = useState()
  const [nextPokemon, setNextPokemon] = useState()

  useEffect(async () => {
    if (current) {
      setCurrentPokemon(current)
      await getNextAndPrevious(current)
    }
  }, [current])

  const getNextAndPrevious = async (current) => {
    setLoading(true)

    if (current) {
      const nextPoke = await pokemonApi.pokemons.getById(current.id + 1)
      if (current.id > 1) {
        const previousPoke = await pokemonApi.pokemons.getById(current.id - 1)

        setPreviousPokemon(previousPoke)
        store('pokemonsSearch').put(previousPoke)
      } else {
        setPreviousPokemon(null)
      }

      setNextPokemon(nextPoke)
      store('pokemonsSearch').put(current)
      store('pokemonsSearch').put(nextPoke)

      setPageTitle(current.formatedName)
      setPageIcon(current.avatar.any)
    }

    setLoading(false)
  }

  const goNextPokemon = () => {
    navigate(`/pokemons/${nextPokemon.name}`)
  }

  const goPreviousPokemon = () => {
    navigate(`/pokemons/${previousPokemon.name}`)
  }

  return rootLoading ? <PokeNavigationSkeleton /> : (
    <div className='navigation__box'>
      <div className='navigation'>
        {
          loading ? <ReactLoading className='loading' type='bubbles' /> :
          previousPokemon ?
          <div className='navigation__previous' onClick={goPreviousPokemon}>
            <BsCaretLeftFill size={22} />
            <span className='pokemon-name'>{capitalize(previousPokemon?.name)}</span>
            <span>#{padStart(previousPokemon?.id, 3, '0')}</span>
          </div>
          : null
        }
        <div className='navigation__current'>
          <span className='pokemon-name'>{capitalize(currentPokemon?.name)}</span>
          <span>#{padStart(currentPokemon?.id, 3, '0')}</span>
        </div>
        {
          loading ? <ReactLoading className='loading' type='bubbles' /> :
          nextPokemon ?
          <div className='navigation__next' onClick={goNextPokemon}>
            <span className='pokemon-name'>{capitalize(nextPokemon?.name)}</span>
            <span>#{padStart(nextPokemon?.id, 3, '0')}</span>
            <BsCaretRightFill size={22} />
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default PokeNavigation
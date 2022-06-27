import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import ReactLoading from 'react-loading'
import _ from 'lodash'

import './index.scss'
import PokeNavigationSkeleton from './skeleton'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'


function PokeNavigation ({ current }) {
  const navigate = useNavigate()

  const { loading: rootLoading } = usePokemonContext()
  const [loading, setLoading] = useState(false)
  const [previousPokemon, setPreviousPokemon] = useState()
  const [currentPokemon, setCurrentPokemon] = useState()
  const [nextPokemon, setNextPokemon] = useState()

  const handleKeyPress = useCallback(event => {
    if (event.key === 'ArrowLeft') {
      navigate(`/pokemons/${previousPokemon.name}`)
    }

    if (event.key === 'ArrowRight') {
      navigate(`/pokemons/${nextPokemon.name}`)
    }
  }, [])

  useEffect(async () => {
    if (current) {
      setCurrentPokemon(current)
      await getNextAndPrevious(current)
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [current, handleKeyPress])

  const getNextAndPrevious = async (current) => {
    setLoading(true)
    const nextPoke = await pokemonApi.pokemons.getById(current.id + 1)
    const previousPoke = await pokemonApi.pokemons.getById(current.id - 1)

    setNextPokemon(nextPoke)
    setPreviousPokemon(previousPoke)
    setLoading(false)
  }

  const goNextPokemon = () => {
    navigate(`/pokemons/${nextPokemon.name}`)
  }

  const goPreviousPokemon = () => {
    navigate(`/pokemons/${previousPokemon.name}`)
  }

  return rootLoading ? <PokeNavigationSkeleton /> : (
    <div className='navigation'>
      {
        loading ? <ReactLoading type='bubbles' color='#2e2e2e' /> :
        previousPokemon ?
        <div className='navigation__previous' onClick={goPreviousPokemon}>
          <BsArrowLeft size={22} />
          <span className='pokemon-name'>{_.capitalize(previousPokemon?.name)}</span>
          <span>#{previousPokemon?.id}</span>
        </div>
        : null
      }
      <div className='navigation__current'>
        <span className='pokemon-name'>{_.capitalize(currentPokemon?.name)}</span>
        <span>#{currentPokemon?.id}</span>
      </div>
      {
        loading ? <ReactLoading type='bubbles' color='#2e2e2e' /> :
        nextPokemon ?
        <div className='navigation__next' onClick={goNextPokemon}>
          <span className='pokemon-name'>{_.capitalize(nextPokemon?.name)}</span>
          <span>#{nextPokemon?.id}</span>
          <BsArrowRight size={22} />
        </div>
        : null
      }
    </div>
  )
}

export default PokeNavigation
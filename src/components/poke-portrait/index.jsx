import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import pokemonApi from '../../core/apis/pokemon.api'

import './index.scss'
import pokemonLogo from './../shared/logos/pokemon-logo.png'
import PokeType from '../poke-type'

function PokePortrait ({ pokemonName }) {
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setPokemon(await pokemonApi.pokemons.getByName(pokemonName))
    setLoading(false)
  }, [pokemonName])

  const getDetailsFromPokemon = (pokemonName) => {
    navigate(`/pokemons/${pokemonName}`)
  }

  return loading
    ? <div className='poke-item__skeleton'><img src={pokemonLogo} alt="pokemon" /></div>
    :
      <div className='poke-item' onClick={() => getDetailsFromPokemon(pokemonName)}>
        <div className='poke-item__background'>
          <span>#{pokemon?.number}</span>
        </div>
        <div className='poke-item__body'>
          <img className='poke-item__body__avatar' src={pokemon?.avatar.any} alt={pokemon?.name} />
          <div className='poke-item__body__types'>
            {pokemon?.types.map((type, index) => <PokeType key={index} type={type} hiddeLabel />)}
          </div>
          <div className='poke-item__body__name'>
            <span>{pokemon?.formatedName}</span>
            <span>{pokemon?.region?.toUpperCase()}</span>
            <span>{pokemon?.modifier?.toUpperCase()}</span>
          </div>
        </div>
        <div className='poke-item__footer'>
        </div>
      </div>
}

export default PokePortrait
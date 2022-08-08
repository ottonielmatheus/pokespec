import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import pokemonApi from '../../core/apis/pokemon.api'
import { usePokemonContext } from '../../contexts/pokemon.context'

import './index.scss'
import PokeNavigation from '../../components/poke-navigation'
import GameVersions from '../../components/game-versions'
import PokeMoves from './../../components/poke-moves'
import PokeAbilities from '../../components/poke-abilities'
import PokeEvolutions from '../../components/poke-evolutions'
import PokeItems from '../../components/poke-items'
import PokeVarieties from '../../components/poke-varieties'
import PokeForms from '../../components/poke-forms'
import PokeShape from '../../components/poke-shape'
import PokeProfile from '../../components/poke-profile'


function PokemonDetails () {
  const navigate = useNavigate()
  const { pokemonName } = useParams()

  const { setLoading } = usePokemonContext()
  const [pokemon, setPokemon] = useState()

  useEffect(async () => {
    await currentPokemon(pokemonName)
  }, [pokemonName])

  const currentPokemon = async (pokeName) => {
    setLoading(true)

    const poke = await pokemonApi.pokemons.getByName(pokeName)
    if (!poke) {
      goNotFound()
    }

    poke.species = await pokemonApi.species.getByUrl(poke.species.url)
    poke.evolutions = await pokemonApi.evolution.getByUrl(poke.species.evolutionChain?.url)

    setPokemon(poke)
    setLoading(false)
  }

  const goNotFound = async () => {
    navigate(`/not-found`)
  }

  return (
    <section id="pokemon-details">
      <PokeNavigation current={pokemon} />
      <GameVersions versions={pokemon?.game_indices} />
      <div className='pokemon'>
        <PokeProfile stats weaknesses pokemon={pokemon} />
        <div className='pokemon__info'>
          {
            pokemon?.evolutions &&
            <PokeEvolutions pokemon={pokemon} pokemonEvolutions={pokemon?.evolutions} />
          }
          {
            (pokemon?.abilities?.length > 0) &&
            <PokeAbilities pokemonAbilities={pokemon?.abilities} />
          }
          {
            (pokemon?.moves?.length > 0) &&
            <PokeMoves pokemonMoves={pokemon?.moves} />
          }
        </div>
      </div>
      <div className='pokemon__metadata'>
        <div className='pokemon__metadata__info'>
          <div className='pokemon__metadata__info__body'>
            {
              pokemon?.species.varieties.length > 1 &&
              <PokeVarieties pokemon={pokemon} pokemonVarieties={pokemon?.species.varieties} />
            }
            {
              pokemon?.forms.length > 1 &&
              <PokeForms pokemon={pokemon} pokemonForms={pokemon?.forms} />
            }
            {
              pokemon?.held_items.length > 0 &&
              <div className='pokemon__metadata__items'>
                <PokeItems pokemonItems={pokemon?.held_items} />
              </div>
            }
          </div>
        </div>
        <div className='pokemon__metadata__details'>
          <PokeShape pokemonSpecies={pokemon?.species} />
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails

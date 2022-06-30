import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'
import _ from 'lodash'

import { usePokemonContext } from '../../contexts/pokemon.context'
import './index.scss'

import PokeMoves from './../../components/poke-moves'
import PokeAbilities from '../../components/poke-abilities'
import PokeEvolutions from '../../components/poke-evolutions'
import PokeType from '../../components/poke-type'
import PokeStats from '../../components/poke-stats'
import PokeItems from '../../components/poke-items'
import PokeHabitat from '../../components/poke-habitat'
import PokeBadge from '../../components/poke-badge'
import PokeVarieties from '../../components/poke-varieties'
import PokeNavigation from '../../components/poke-navigation'
import PokeShape from '../../components/poke-shape'

import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'

function PokemonDetails () {
  const navigate = useNavigate()
  const { pokemonName } = useParams()

  const { loading, setLoading } = usePokemonContext()
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

    const { formatedName, genre, modifier, region } = pokemonUtils.formatName(poke.name)
    poke.formatedName = formatedName
    poke.genre = genre
    poke.modifier = modifier
    poke.region = region

    poke.types = await pokemonUtils.formatTypes(poke.types)

    const { weakness, resistance, immune } = await pokemonUtils.getWeaknessAndResistance(poke.types)
    poke.weakness = weakness
    poke.resistance = resistance
    poke.immune = immune

    poke.moves = _.sortBy(poke.moves, [item => item.move.name])
    poke.abilities = _.sortBy(poke.abilities, [item => item.ability.name])

    poke.effectiveness = pokemonUtils.getEffectiveness(poke.weakness, poke.resistance, poke.immune)

    poke.species = await pokemonApi.species.getByUrl(poke.species.url)
    poke.evolutions = await pokemonApi.evolution.getByUrl(poke.species.evolution_chain.url)

    poke.species = await pokemonUtils.formatSpecies(poke.species)
    poke.evolutions = await pokemonUtils.formatEvolutions(poke.evolutions.chain)

    poke.stats = {
      hp: pokemonUtils.getStatsValue(poke.stats, 'hp'),
      attack: pokemonUtils.getStatsValue(poke.stats, 'attack'),
      specialAttack: pokemonUtils.getStatsValue(poke.stats, 'special-attack'),
      defense: pokemonUtils.getStatsValue(poke.stats, 'defense'),
      specialDefense: pokemonUtils.getStatsValue(poke.stats, 'special-defense'),
      speed: pokemonUtils.getStatsValue(poke.stats, 'speed')
    }

    setPokemon(poke)
    setLoading(false)
  }

  const goNotFound = async () => {
    navigate(`/not-found`)
  }

  return (
    <section id="pokemon-details">
      <PokeNavigation current={pokemon} />
      <div className='pokemon'>
        {
          loading ?
          <div className='pokemon__profile--skeleton'>
            <ReactLoading type='bubbles' color='#2e2e2e' />
          </div> :
          <div className='pokemon__profile'>
            <div className='pokemon__profile__header'>
              {pokemon.formatedName}
              <div className='pokemon__profile__header__types'>
                {pokemon?.types?.map((type, index) => (<PokeType key={index} type={type} />))}
              </div>
            </div>
            <div className='pokemon__profile__body'>
              <div className='pokemon__profile__body__badges'>
                <div className='pokemon__profile__body__badges__variations'>
                  {pokemon?.modifier &&
                    <PokeBadge badge={pokemon?.modifier} />
                  }
                  {pokemon?.region &&
                    <PokeBadge badge={pokemon?.region} />
                  }
                </div>
                {
                  pokemon?.species.characteristics.length > 0 &&
                  <div className='pokemon__profile__body__badges__characteristics'>
                  {
                    pokemon?.species.characteristics.map((characteristic, index) => (
                      <div key={index}>
                        <img src={characteristic.image} alt={characteristic.name} />
                        <p>{characteristic.name}</p>
                      </div>
                    ))
                  }
                  </div>
                }
              </div>
              <img alt={pokemon.formatedName}
                src={pokemon?.sprites?.other['official-artwork']?.front_default || pokemon.sprites.front_default}
              />
              <div className='pokemon__profile__body__measures'>
                  <span>{pokemon.height}&quot;</span>
                  <span>{pokemon.weight} lbs</span>
              </div>
              <PokeStats pokemonStats={pokemon?.stats} />
            </div>
            <div className='pokemon__profile__footer'>
              <div className='pokemon__profile__footer__damage-table'>
                <span>damage received</span>
                <div className='pokemon__profile__footer__damage-table__elements'>
                  <div>
                    <small>x0</small>
                    <div className='elements'>
                      {pokemon?.effectiveness['0']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x0.25</small>
                    <div className='elements'>
                      {pokemon?.effectiveness['0.25']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x0.5</small>
                    <div className='elements'>
                      {pokemon?.effectiveness['0.5']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x2</small>
                    <div className='elements'>
                      {pokemon?.effectiveness['2']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>x4</small>
                    <div className='elements'>
                      {pokemon?.effectiveness['4']?.map((element, index) => (
                        <img key={index} src={element.icon} alt={element.name} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
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
          <PokeHabitat pokemonHabitat={pokemon?.species.habitat}>
            <div className='pokemon__metadata__info__habitat__name'>
              <small>from </small><span>{pokemon?.species.generation}</span>
              <p>{pokemon?.species.genus}</p>
            </div>
            <div className='pokemon__metadata__info__habitat__body'>
              <div className='pokemon__metadata__info__habitat__body__about'>
                <p>{pokemon?.species.about.replace('', ' ')}</p>
              </div>
            </div>
          </PokeHabitat>
          {
            (pokemon?.held_items.length > 0 || pokemon?.species.varieties.length > 1) &&
            <div className='pokemon__metadata__info__body'>
              {
                pokemon?.held_items.length > 0 &&
                <PokeItems pokemonItems={pokemon?.held_items} />
              }
              {
                pokemon?.species.varieties.length > 1 &&
                <PokeVarieties pokemonVarieties={pokemon?.species.varieties} />
              }
            </div>
          }
        </div>
        <div className='pokemon__metadata__details'>
          <PokeShape pokemonSpecies={pokemon?.species} />
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails

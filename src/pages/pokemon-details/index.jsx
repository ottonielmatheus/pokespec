import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

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
import PokeCompetitors from '../../components/poke-competitors'
import PokeSearch from '../../components/poke-search'

function PokemonDetails () {
  const navigate = useNavigate()
  const { pokemonName } = useParams()
  const { setLoading } = usePokemonContext()
  const [pokemon, setPokemon] = useState()
  const [competitorsNames, setCompetitorsNames] = useState([])
  const [selectedCompetitor, setSelectedCompetitor] = useState()

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

  const addCompetitor = (competitor) => {
    if (!competitorsNames.includes(competitor)) {
      setCompetitorsNames([...competitorsNames, competitor])
    }
  }

  const clearCompetitors = () => {
    setCompetitorsNames([])
    setSelectedCompetitor(null)
  }

  return (
    <section id="pokemon-details">
      <PokeNavigation current={pokemon} />
      <div className='content'>
        <div className='content__actions__compare'>
          <div className='content__actions__compare__icon-buttons'>
            <button className='icon' disabled={!competitorsNames.length} onClick={clearCompetitors}><IoClose /></button>
          </div>
        </div>
        <div className='content__actions__pokemon'>
          {
            (pokemon && selectedCompetitor) &&
            <Link to={`/compare/${pokemon?.name}/vs/${selectedCompetitor.name}`}>
              <button className='simple'>Go to full comparison</button>
            </Link>
          }
        </div>
        <div className='content__actions__game-versions'>
          <GameVersions versions={pokemon?.game_indices} />
        </div>
        <div className='pokemon__compare'>
          <PokeSearch onSearch={addCompetitor} placeholder='Compare with...' />
          {
            !!competitorsNames.length &&
            <PokeCompetitors
              diffTo={pokemon}
              competitorsNames={competitorsNames}
              selectedCompetitor={selectedCompetitor}
              onChange={setSelectedCompetitor}
              onClose={(closedCompetitorName) => {
                setCompetitorsNames(competitorsNames.filter(competitorName => competitorName !== closedCompetitorName))
              }}
              onEmpty={() => {
                setCompetitorsNames([])
                setSelectedCompetitor(null)
              }}/>
          }
          <div className='pokemon__varieties'>
            {
              pokemon?.species.varieties.length > 1 &&
              <PokeVarieties pokemon={pokemon} pokemonVarieties={pokemon?.species.varieties} />
            }
            {
              pokemon?.forms.length > 1 &&
              <PokeForms pokemon={pokemon} pokemonForms={pokemon?.forms} />
            }
          </div>
        </div>
        <div className='pokemon__main'>
          <div className='pokemon'>
            <PokeProfile stats weaknesses pokemon={pokemon} diff={selectedCompetitor} />
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
        </div>
        <div className='pokemon__details'>
          <div className='pokemon__details__shape'>
            <PokeShape pokemon={pokemon} pokemonSpecies={pokemon?.species} />
          </div>
          {
            pokemon?.held_items.length > 0 &&
            <div className='pokemon__details__items'>
              <PokeItems pokemonItems={pokemon?.held_items} />
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails

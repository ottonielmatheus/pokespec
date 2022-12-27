import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { map, property, max, chain, intersection } from 'lodash'

import pokemonApi from '../../core/apis/pokemon.api'
import { usePokemonContext } from '../../contexts/pokemon.context'
import { fromVersion } from '../../core/pokemon.utils'

import './index.scss'
import PokeSearch from '../../components/poke-search'
import PokeProfile from '../../components/poke-profile'
import StatsRadar from '../../components/poke-stats/stats-radar'
import GameVersions from '../../components/game-versions'

function PokemonCompare () {
  const { setLoading, gameVersion } = usePokemonContext()
  const { pokemonTargetName, pokemonToCompareName } = useParams()
  const [fighter, setFighter] = useState(null)
  const [opponent, setOpponent] = useState(null)
  let fightersGamesVersion = []

  useEffect(async () => {
    let fighters = await Promise.all([
      pokemonApi.pokemons.getByName(pokemonTargetName),
      pokemonApi.pokemons.getByName(pokemonToCompareName)
    ])

    await setFightersMoves(fighters)

    setLoading(false)
    setFighter(fighters[0])
    setOpponent(fighters[1])
    fightersGamesVersion = intersection()
  }, [pokemonTargetName, pokemonToCompareName])

  const setFightersMoves = async (fighters) => {
    for (const fighter of fighters) {
      fighter.moves = await Promise.all(
        fighter.moves
          .filter(move => filterMoves(fighter.params, move))
          .map(async (item) => {
            const moveDetails = fromVersion(item.version_group_details, gameVersion)
            return {
              learn: {
                atLevel: moveDetails?.level_learned_at,
                method: moveDetails?.move_learn_method?.name
              },
              ...await pokemonApi.moves.getByName(item.move.name)
            }
          })
      )
    }
  }

  const filterMoves = (move) => {
    const moveDetails = fromVersion(move.version_group_details, gameVersion)
    const isLevelUpLearnMethod = moveDetails?.move_learn_method?.name === 'level-up'
    return isLevelUpLearnMethod
  }

  const getHeader = (fighter, index) => {
    return (
      <th key={index} colSpan='2'>
        <div>
          <img src={fighter?.avatar.default} alt={fighter?.name} />
          {fighter?.name}
        </div>
      </th>
    )
  }

  const compareAttributes = (attributeName, fighters, properties, winBy, viewProperty) => {
    const attributes = map(fighters, property(properties))
    const viewValues = map(fighters, property(viewProperty))
    const winner = typeof winBy === 'function' ? winBy(attributes) : null

    return (
      <tr>
        <td><div>{attributeName}</div></td>
        {
          attributes.map((attribute, index) => <td key={index}>
            <div className={`value${winner === attribute ? '' : '--loser'}`}>
              {viewValues[index] || attribute}
            </div>
          </td>)
        }
        <td><div>{attributeName}</div></td>
      </tr>
    )
  }

  const compareMoves = (fighterMoves, opponentMoves) => {
    if (fighterMoves && opponentMoves) {
      const allLevels = chain([...fighterMoves, ...opponentMoves])
        .map(move => move.learn.atLevel)
        .uniq()
        .sort()
        .value()

      const getMove = (moves, level) => {
        const move = moves.find(move => move.learn.atLevel === level)
        return <div className={`move${move ? '' : '--empty'}`}>
          {move && <img src={move?.type.icon} alt={move?.type.name} />}
          <span>{move?.name || '-'}</span>
        </div>
      }

      return allLevels.map((level, index) => <tr key={index}>
        <td>{getMove(fighterMoves, level) || '-'}</td>
        <td>lvl. {level}</td>
        <td>{getMove(opponentMoves, level) || '-'}</td>
      </tr>)
    }
  }

  return (
    <section className='pokemon-compare-page'>
      <div className='pokemon-compare-page__opponent'>
        <PokeSearch placeholder='Select a pokémon to compare' on />
        <div className='pokemon-compare-page__opponent__fighter'>
          <PokeProfile short stats effectiveness pokemon={fighter} diff={opponent} />
        </div>
      </div>
      <div>
        <div>
          <GameVersions versions={fightersGamesVersion} />
        </div>
        <div className='pokemon-compare-page__result'>
          <table className='pokemon-compare-page__result__stats-diff'>
            <thead>
              <tr>
                {[fighter, opponent].map(getHeader)}
              </tr>
            </thead>
            <tbody>
              {compareAttributes('HP', [fighter, opponent], 'stats.hp.baseValue', max)}
              {compareAttributes('Attack', [fighter, opponent], 'stats.attack.baseValue', max)}
              {compareAttributes('Defense', [fighter, opponent], 'stats.defense.baseValue', max)}
              {compareAttributes('Special Attack', [fighter, opponent], 'stats.specialAttack.baseValue', max)}
              {compareAttributes('Special Defense', [fighter, opponent], 'stats.specialDefense.baseValue', max)}
              {compareAttributes('Speed', [fighter, opponent], 'stats.speed.baseValue', max)}
              {compareAttributes('Overall', [fighter, opponent], 'stats.overall.baseValue', max)}
              {compareAttributes('Weight', [fighter, opponent], 'weight.literal', max, 'weight.formated')}
              {compareAttributes('Height', [fighter, opponent], 'height.literal', max, 'height.formated')}
            </tbody>
          </table>
          <StatsRadar color={fighter?.types[0].color} stats={fighter?.stats} diffTo={opponent}/>
          <table className='pokemon-compare-page__result__moves-diff'>
            <thead>
              <tr>
                <th>
                  <div>
                    <img src={fighter?.avatar.default} alt={fighter?.name} />
                    {fighter?.name}
                  </div>
                </th>
                <th></th>
                <th>
                  <div>
                    <img src={opponent?.avatar.default} alt={opponent?.name} />
                    {opponent?.name}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {compareMoves(fighter?.moves, opponent?.moves)}
            </tbody>
          </table>
        </div>
      </div>
      <div className='pokemon-compare-page__opponent'>
        <PokeSearch placeholder='Select a pokémon to compare' />
        <div className='pokemon-compare-page__opponent__fighter'>
          <PokeProfile short stats effectiveness pokemon={opponent} diff={fighter} />
        </div>
      </div>
    </section>
  )
}

export default PokemonCompare
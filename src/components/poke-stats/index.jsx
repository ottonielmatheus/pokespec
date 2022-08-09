import React, { useEffect, useState } from 'react'

import { getStatsValue, getStatsDiff } from '../../core/pokemon.utils'

import './index.scss'
import PercentageBar from '../../components/shared/percentage-bar'


function PokeStats ({ pokemonStats, diffTo, short }) {
  const [pokeStats, setPokeStats] = useState()
  const [diffStats, setDiffStats] = useState()
  const [totalStat, setTotalStat] = useState(0)
  const [totalDiffStat, setTotalDiffStat] = useState(null)

  useEffect(() => {
    const stats = {
      hp: getStatsValue(pokemonStats, 'hp'),
      attack: getStatsValue(pokemonStats, 'attack'),
      specialAttack: getStatsValue(pokemonStats, 'special-attack'),
      defense: getStatsValue(pokemonStats, 'defense'),
      specialDefense: getStatsValue(pokemonStats, 'special-defense'),
      speed: getStatsValue(pokemonStats, 'speed')
    }

    if (diffTo) {
      const diff = {
        hp: getStatsDiff(diffTo, 'hp', stats.hp),
        attack: getStatsDiff(diffTo, 'attack', stats.attack),
        specialAttack: getStatsDiff(diffTo, 'special-attack', stats.specialAttack),
        defense: getStatsDiff(diffTo, 'defense', stats.defense),
        specialDefense: getStatsDiff(diffTo, 'special-defense', stats.specialDefense),
        speed: getStatsDiff(diffTo, 'speed', stats.speed)
      }
      setDiffStats(diff)
      setTotalDiffStat(getTotalStats(diffTo))
    }

    setPokeStats(stats)
    setTotalStat(getTotalStats(pokemonStats))
  }, [pokemonStats])

  const getTotalStats = (stats) => {
    if (!stats) return 0
    return stats.reduce((acc, stat) => acc + stat.base_stat, 0)
  }

  const getTotalDiff = (a, b) => {
    const result = a - b
    const diffValue = Math.abs(result)

    return {
      baseValue: diffValue,
      signal: result > 0 ? '+' : '-'
    }
  }

  const getDiffColor = (stat) => stat?.signal === '+' ? 'rgba(181, 228, 140, 1)' : '#f78092'
  const getDiffValue = (stat) => {
    if (!stat) return ''
    return (
      <span className={stat.signal === '+' ? 'positive' : 'negative'}>
        {
          stat.baseValue !== 0 ?
          `${stat.signal}${stat.baseValue}`
          : <span style={{ color: '#7e7e7e' }}>=&nbsp;</span>
        }
      </span>
    )
  }

  const statRow = (stat, statColor, shortStatName, statName, statValue, statDiffValue) => {
    const statsValues = [
      statDiffValue?.signal === '+'
        ? (statValue?.basePercentage - statDiffValue?.basePercentage)
        : statValue?.basePercentage,
      statDiffValue?.basePercentage
    ]

    return (
      <div className={stat}>
        {short ? <span>{shortStatName}</span> : <span>{statName}</span>}
        <PercentageBar className='pokemon-stats__bar'
          colors={[statColor, getDiffColor(statDiffValue)]}
          values={statsValues} />
        <span>{statValue?.baseValue} {getDiffValue(statDiffValue)}</span>
      </div>
    )
  }

  return (
    <div className={`pokemon-stats${short ? '--short' : ''}`}>
      {statRow('hp', '#52b69a', 'HP', 'HP', pokeStats?.hp, diffStats?.hp)}
      {statRow('attack', '#ce4257', 'A', 'Attack', pokeStats?.attack, diffStats?.attack)}
      {statRow('defense', '#48cae4', 'D', 'Defense', pokeStats?.defense, diffStats?.defense)}
      {statRow('special-attack', '#ff7f51', 'SA', 'Sp Att', pokeStats?.specialAttack, diffStats?.specialAttack)}
      {statRow('special-defense', '#e0aaff', 'SD', 'Sp Def', pokeStats?.specialDefense, diffStats?.specialDefense)}
      {statRow('speed', '#f4d35e', 'S', 'Speed', pokeStats?.speed, diffStats?.speed)}
      <div className='total'>
        {short ? <span>T</span> : <span>Total</span>}
        <span className='pokemon-stats__bar'></span>
        <span>{totalStat} {diffTo && getDiffValue(getTotalDiff(totalStat, totalDiffStat))}</span>
      </div>
    </div>
  )
}

export default PokeStats
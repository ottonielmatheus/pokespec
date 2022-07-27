import React, { useEffect, useState } from 'react'

import pokemonUtils from '../../core/pokemon.utils'

import './index.scss'
import PercentageBar from '../../components/shared/percentage-bar'


function PokeStats ({ pokemonStats, diffTo, short }) {
  const [pokeStats, setPokeStats] = useState()
  const [diffStats, setDiffStats] = useState()
  const [totalStat, setTotalStat] = useState(0)
  const [totalDiffStat, setTotalDiffStat] = useState(null)

  useEffect(() => {
    const stats = {
      hp: pokemonUtils.getStatsValue(pokemonStats, 'hp'),
      attack: pokemonUtils.getStatsValue(pokemonStats, 'attack'),
      specialAttack: pokemonUtils.getStatsValue(pokemonStats, 'special-attack'),
      defense: pokemonUtils.getStatsValue(pokemonStats, 'defense'),
      specialDefense: pokemonUtils.getStatsValue(pokemonStats, 'special-defense'),
      speed: pokemonUtils.getStatsValue(pokemonStats, 'speed')
    }

    if (diffTo) {
      const diff = {
        hp: pokemonUtils.getStatsDiff(diffTo, 'hp', stats.hp),
        attack: pokemonUtils.getStatsDiff(diffTo, 'attack', stats.attack),
        specialAttack: pokemonUtils.getStatsDiff(diffTo, 'special-attack', stats.specialAttack),
        defense: pokemonUtils.getStatsDiff(diffTo, 'defense', stats.defense),
        specialDefense: pokemonUtils.getStatsDiff(diffTo, 'special-defense', stats.specialDefense),
        speed: pokemonUtils.getStatsDiff(diffTo, 'speed', stats.speed)
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

  return (
    <div className={`pokemon-stats${short ? '--short' : ''}`}>
      <div className='hp'>
        <span>HP</span>
        <PercentageBar className='pokemon-stats__bar'
          colors={['#52b69a', getDiffColor(diffStats?.hp)]}
          values={[pokeStats?.hp.basePercentage, diffStats?.hp.basePercentage]} />
        <span>{pokeStats?.hp.baseValue} {getDiffValue(diffStats?.hp)}</span>
      </div>
      <div className='attack'>
        {short ? <span>A</span> : <span>Attack</span>}
        <PercentageBar className='pokemon-stats__bar'
          colors={['#ce4257', getDiffColor(diffStats?.attack)]}
          values={[pokeStats?.attack.basePercentage, diffStats?.attack.basePercentage]} />
        <span>{pokeStats?.attack.baseValue} {getDiffValue(diffStats?.attack)}</span>
      </div>
      <div className='defense'>
        {short ? <span>D</span> : <span>Defense</span>}
        <PercentageBar className='pokemon-stats__bar'
          colors={['#48cae4', getDiffColor(diffStats?.defense)]}
          values={[pokeStats?.defense.basePercentage, diffStats?.defense.basePercentage]} />
        <span>{pokeStats?.defense.baseValue} {getDiffValue(diffStats?.defense)}</span>
      </div>
      <div className='special-attack'>
        {short ? <span>SA</span> : <span>Su Att</span>}
        <PercentageBar className='pokemon-stats__bar'
          colors={['#ff7f51', getDiffColor(diffStats?.specialAttack)]}
          values={[pokeStats?.specialAttack.basePercentage, diffStats?.specialAttack.basePercentage]} />
        <span>{pokeStats?.specialAttack.baseValue} {getDiffValue(diffStats?.specialAttack)}</span>
      </div>
      <div className='special-defense'>
        {short ? <span>SD</span> : <span>Su Def</span>}
        <PercentageBar className='pokemon-stats__bar'
          colors={['#e0aaff', getDiffColor(diffStats?.specialDefense)]}
          values={[pokeStats?.specialDefense.basePercentage, diffStats?.specialDefense.basePercentage]} />
        <span>{pokeStats?.specialDefense.baseValue} {getDiffValue(diffStats?.specialDefense)}</span>
      </div>
      <div className='speed'>
        {short ? <span>SP</span> : <span>Speed</span>}
        <PercentageBar className='pokemon-stats__bar'
          colors={['#f4d35e', getDiffColor(diffStats?.speed)]}
          values={[pokeStats?.speed.basePercentage, diffStats?.speed.basePercentage]} />
        <span>{pokeStats?.speed.baseValue} {getDiffValue(diffStats?.speed)}</span>
      </div>
      <div className='total'>
        {short ? <span>T</span> : <span>Total</span>}
        <span className='pokemon-stats__bar'></span>
        <span>{totalStat} {diffTo && getDiffValue(getTotalDiff(totalStat, totalDiffStat))}</span>
      </div>
    </div>
  )
}

export default PokeStats
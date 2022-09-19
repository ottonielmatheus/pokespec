import React, { useEffect, useState } from 'react'

import './index.scss'
import PercentageBar from '../../components/shared/percentage-bar'
import StatsRadar from './stats-radar'

function PokeStats ({ pokemon, diffTo, short, type }) {
  const firstTypeColor = pokemon?.types[0].color
  const [diffResult, setDiffResult] = useState()

  useEffect(() => {
    if (diffTo && pokemon?.stats) {
      const diff = {
        hp: getStatsDiff(diffTo.stats.hp, pokemon?.stats.hp),
        attack: getStatsDiff(diffTo.stats.attack, pokemon?.stats.attack),
        specialAttack: getStatsDiff(diffTo.stats.specialAttack, pokemon?.stats.specialAttack),
        defense: getStatsDiff(diffTo.stats.defense, pokemon?.stats.defense),
        specialDefense: getStatsDiff(diffTo.stats.specialDefense, pokemon?.stats.specialDefense),
        speed: getStatsDiff(diffTo.stats.speed, pokemon?.stats.speed),
        overall: getStatsDiff(diffTo.stats.overall, pokemon?.stats.overall)
      }
      setDiffResult(diff)
    }
  }, [pokemon])

  const getStatsDiff = (statA, statB) => {
    const result = statB.baseValue - statA.baseValue
    const diffValue = Math.abs(result)

    return {
      baseValue: diffValue,
      basePercentage: (diffValue / 255) * 100,
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
          `(${stat.signal}${stat.baseValue})`
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
        {statColor ?
          <PercentageBar className='pokemon-stats__bar'
            colors={[statColor, getDiffColor(statDiffValue)]}
            values={statsValues} />
          : <div></div>
        }
        <span>{statValue?.baseValue} {getDiffValue(statDiffValue)}</span>
      </div>
    )
  }

  return type === 'radar'
    ? <StatsRadar color={firstTypeColor} stats={pokemon?.stats} diffTo={diffTo} />
    : (
      <div className={`pokemon-stats${short ? '--short' : ''}`}>
        {statRow('hp', '#52b69a', 'HP', 'HP', pokemon?.stats.hp, diffResult?.hp)}
        {statRow('attack', '#ce4257', 'AT', 'Attack', pokemon?.stats.attack, diffResult?.attack)}
        {statRow('defense', '#48cae4', 'DF', 'Defense', pokemon?.stats.defense, diffResult?.defense)}
        {statRow('special-attack', '#ff7f51', 'SA', 'Sp Att', pokemon?.stats.specialAttack, diffResult?.specialAttack)}
        {statRow('special-defense', '#e0aaff', 'SD', 'Sp Def', pokemon?.stats.specialDefense, diffResult?.specialDefense)}
        {statRow('speed', '#f4d35e', 'SP', 'Speed', pokemon?.stats.speed, diffResult?.speed)}
        {statRow('overall', null, 'OA', 'Overall', pokemon?.stats.overall, diffResult?.overall)}
      </div>
    )
}

export default PokeStats
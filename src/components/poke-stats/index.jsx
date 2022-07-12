import React from 'react'
import _ from 'lodash'
import PercentageBar from '../../components/shared/percentage-bar'

import './index.scss'


function PokeStats ({ pokemonStats }) {
  const totalStat = _.values(pokemonStats)
    .map(stat => stat.baseValue)
    .reduce((acc, value) => acc + value, 0)

  return (
    <div className='pokemon-stats'>
      <div className='hp'>
        <span>HP</span>
        <PercentageBar className='pokemon-stats__bar' color='#52b69a' value={pokemonStats?.hp.basePercentage} />
        <span>{pokemonStats?.hp.baseValue}</span>
      </div>
      <div className='attack'>
        <span>Attack</span>
        <PercentageBar className='pokemon-stats__bar' color='#ce4257' value={pokemonStats?.attack.basePercentage} />
        <span>{pokemonStats?.attack.baseValue}</span>
      </div>
      <div className='special-attack'>
        <span>S Attack</span>
        <PercentageBar className='pokemon-stats__bar' color='#ff7f51' value={pokemonStats?.specialAttack.basePercentage} />
        <span>{pokemonStats?.specialAttack.baseValue}</span>
      </div>
      <div className='defense'>
        <span>Defense</span>
        <PercentageBar className='pokemon-stats__bar' color='#A0C4FF' value={pokemonStats?.defense.basePercentage} />
        <span>{pokemonStats?.defense.baseValue}</span>
      </div>
      <div className='special-defense'>
        <span>S Defense</span>
        <PercentageBar className='pokemon-stats__bar' color='#BDB2FF' value={pokemonStats?.specialDefense.basePercentage} />
        <span>{pokemonStats?.specialDefense.baseValue}</span>
      </div>
      <div className='speed'>
        <span>Speed</span>
        <PercentageBar className='pokemon-stats__bar' color='#f4d35e' value={pokemonStats?.speed.basePercentage} />
        <span>{pokemonStats?.speed.baseValue}</span>
      </div>
      <div className='total' style={{ paddingTop: '8px' }}>
        <span>Total</span>
        <span>{totalStat}</span>
      </div>
    </div>
  )
}

export default PokeStats
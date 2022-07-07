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
        <PercentageBar className='pokemon-stats__bar' color='#5f9747' value={pokemonStats?.hp.basePercentage} />
        <span>{pokemonStats?.hp.baseValue}</span>
      </div>
      <div className='attack'>
        <span>Attack</span>
        <PercentageBar className='pokemon-stats__bar' color='#f44336' value={pokemonStats?.attack.basePercentage} />
        <span>{pokemonStats?.attack.baseValue}</span>
      </div>
      <div className='special-attack'>
        <span>Spc attack</span>
        <PercentageBar className='pokemon-stats__bar' color='#aa2e25' value={pokemonStats?.specialAttack.basePercentage} />
        <span>{pokemonStats?.specialAttack.baseValue}</span>
      </div>
      <div className='defense'>
        <span>Defense</span>
        <PercentageBar className='pokemon-stats__bar' color='skyblue' value={pokemonStats?.defense.basePercentage} />
        <span>{pokemonStats?.defense.baseValue}</span>
      </div>
      <div className='special-defense'>
        <span>Spc defense</span>
        <PercentageBar className='pokemon-stats__bar' color='#436775' value={pokemonStats?.specialDefense.basePercentage} />
        <span>{pokemonStats?.specialDefense.baseValue}</span>
      </div>
      <div className='speed'>
        <span>Speed</span>
        <PercentageBar className='pokemon-stats__bar' color='#e69138' value={pokemonStats?.speed.basePercentage} />
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
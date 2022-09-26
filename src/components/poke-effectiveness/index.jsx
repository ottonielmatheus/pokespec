import React from 'react'
import './index.scss'

function PokeEffectiveness ({ effectiveness, short = false }) {
  const pokemonEffectiveness = effectiveness || []
  return (
    <div className={`poke-effectiveness${short ? '--short' : ''}`}>
      <div className={`poke-effectiveness__elements`}>
        <div>
          <small>0x</small>
          <div className='elements'>
            {pokemonEffectiveness['0']?.map((element, index) => (
              <img key={index} src={element.icon} alt={element.name} />
            ))}
          </div>
        </div>
        <div>
          <small>0.25x</small>
          <div className='elements'>
            {pokemonEffectiveness['0.25']?.map((element, index) => (
              <img key={index} src={element.icon} alt={element.name} />
            ))}
          </div>
        </div>
        <div>
          <small>0.5x</small>
          <div className='elements'>
            {pokemonEffectiveness['0.5']?.map((element, index) => (
              <img key={index} src={element.icon} alt={element.name} />
            ))}
          </div>
        </div>
        <div>
          <small>2x</small>
          <div className='elements'>
            {pokemonEffectiveness['2']?.map((element, index) => (
              <img key={index} src={element.icon} alt={element.name} />
            ))}
          </div>
        </div>
        <div>
          <small>4x</small>
          <div className='elements'>
            {pokemonEffectiveness['4']?.map((element, index) => (
              <img key={index} src={element.icon} alt={element.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokeEffectiveness
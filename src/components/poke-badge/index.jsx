import React from 'react'

import './index.scss'

function PokeBadge ({ badge }) {
  return (
    <div className='poke-badge'
      style={{
        backgroundImage: {
          gmax: 'linear-gradient(315deg, #d99058 0%, #f8de7e 74%)',
          mega: 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)',
          'mega-x': 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)',
          'mega-y': 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)',
          'eternamax': 'linear-gradient(315deg, #0cbaba 0%, #380036 74%)',
          alola: 'linear-gradient(90deg, rgba(108,9,121,1) 0%, rgba(255,222,0,1) 100%)',
          galar: 'linear-gradient(90deg, rgba(20,9,121,1) 0%, rgba(255,0,44,1) 100%)'
        }[badge]
      }}>
      {badge?.toUpperCase()}
    </div>
  )
}

export default PokeBadge
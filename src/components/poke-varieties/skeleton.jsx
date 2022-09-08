import React from 'react'

function PokeVarietiesSkeleton() {
  return (
    <div className='poke-varieties skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div className='poke-varieties__body' style={{
          display: 'grid',
          gridAutoFlow: 'row',
          gap: '8px',
        }}>
        <span className='variety primary' style={{ height: '414px' }}></span>
        <span className='variety primary' style={{ height: '414px' }}></span>
      </div>
    </div>
  )
}

export default PokeVarietiesSkeleton
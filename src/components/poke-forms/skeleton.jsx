import React from 'react'

function PokeVarietiesSkeleton() {
  return (
    <div className='poke-forms skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div className='poke-forms__body' style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
        <span className='form primary' style={{ height: '294px' }}></span>
        <span className='form primary' style={{ height: '294px' }}></span>
        <span className='form primary' style={{ height: '294px' }}></span>
      </div>
    </div>
  )
}

export default PokeVarietiesSkeleton
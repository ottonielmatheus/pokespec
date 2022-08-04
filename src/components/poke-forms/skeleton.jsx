import React from 'react'

function PokeVarietiesSkeleton() {
  return (
    <div className='poke-forms skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div className='poke-forms__header' style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <span style={{ width: '72px', height: '20px' }}></span>
        <span style={{ width: '5%', height: '10px' }}></span>
      </div>
      <div className='poke-forms__body' style={{
          display: 'grid',
          gap: '8px',
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(300px, 300px)'
        }}>
        <span className='form primary' style={{ height: '208px' }}></span>
        <span className='form primary' style={{ height: '208px' }}></span>
        <span className='form primary' style={{ height: '208px' }}></span>
      </div>
    </div>
  )
}

export default PokeVarietiesSkeleton
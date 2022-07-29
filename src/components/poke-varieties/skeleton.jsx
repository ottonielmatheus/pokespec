import React from 'react'

function PokeVarietiesSkeleton() {
  return (
    <div className='poke-varieties skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div className='poke-varieties__header' style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <span style={{ width: '72px', height: '20px' }}></span>
        <span style={{ width: '5%', height: '10px' }}></span>
      </div>
      <div className='poke-varieties__body' style={{
          display: 'grid',
          gap: '8px',
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(300px, 300px)'
        }}>
        <span className='variety primary' style={{ height: '414px' }}></span>
        <span className='variety primary' style={{ height: '414px' }}></span>
      </div>
    </div>
  )
}

export default PokeVarietiesSkeleton
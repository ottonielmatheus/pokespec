import React from 'react'

function PokeMovesSkeleton () {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ width: '64px', height: '20px' }}></span>
        <span style={{ width: '5%', height: '10px' }}></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ width: '100%', height: '72px' }}></span>
        <span style={{ width: '100%', height: '72px' }}></span>
        <span style={{ width: '100%', height: '72px' }}></span>
      </div>
    </div>
  )
}

export default PokeMovesSkeleton

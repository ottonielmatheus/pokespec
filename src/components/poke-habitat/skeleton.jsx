import React from 'react'

function PokeHabitatSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 12px' }}>
      <span style={{ width: '114px', height: '10px' }}></span>
      <span style={{ width: '228px', height: '30px' }}></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px' }}>
        <span style={{ width: '60%', height: '10px' }}></span>
        <span style={{ width: '65%', height: '10px' }}></span>
        <span style={{ width: '55%', height: '10px' }}></span>
      </div>
    </div>
  )
}

export default PokeHabitatSkeleton

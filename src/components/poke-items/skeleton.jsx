import React from 'react'

function PokeItemsSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ width: '64px', height: '20px' }}></span>
        <span style={{ width: '5%', height: '10px' }}></span>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ width: '50px', height: '50px', borderRadius: '5px' }}></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ width: '50px', height: '50px', borderRadius: '5px' }}></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ width: '50px', height: '50px', borderRadius: '5px' }}></span>
        </div>
      </div>
    </div>
  )
}

export default PokeItemsSkeleton
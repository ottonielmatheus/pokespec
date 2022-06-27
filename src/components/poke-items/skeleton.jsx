import React from 'react'

function PokeItemsSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '10%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '5%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '5px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '5px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '5px', backgroundColor: '#2c2c2c' }}></div>
        </div>
      </div>
    </div>
  )
}

export default PokeItemsSkeleton
import React from 'react'

function PokeHabitatSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 32px' }}>
      <div style={{ width: '114px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      <div style={{ width: '228px', height: '30px', backgroundColor: '#2c2c2c' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px' }}>
        <div style={{ width: '60%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '65%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '55%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>
    </div>
  )
}

export default PokeHabitatSkeleton

import React from 'react'

function PokeMovesSkeleton () {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ width: '64px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '5%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ width: '100%', height: '72px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '100%', height: '72px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '100%', height: '72px', backgroundColor: '#2c2c2c' }}></div>
      </div>
    </div>
  )
}

export default PokeMovesSkeleton

import React from 'react'

function PokeMovesSkeleton () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='skeleton' style={{ width: '20%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div className='skeleton' style={{ width: '5%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div className='skeleton' style={{ width: '100%', height: '50px', backgroundColor: '#2c2c2c' }}></div>
        <div className='skeleton' style={{ width: '100%', height: '50px', backgroundColor: '#2c2c2c' }}></div>
        <div className='skeleton' style={{ width: '100%', height: '50px', backgroundColor: '#2c2c2c' }}></div>
      </div>
    </div>
  )
}

export default PokeMovesSkeleton

import React from 'react'

function PokeVarietiesSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '10%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '5%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>
      <div style={{ display: 'flex', gap: '57px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c' }}></div>
          <div style={{ width: '50px', height: '20px', backgroundColor: '#2c2c2c', position: 'absolute', top: '-20px', right: '-42px' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c' }}></div>
          <div style={{ width: '50px', height: '20px', backgroundColor: '#2c2c2c', position: 'absolute', top: '-20px', right: '-42px' }}></div>
        </div>
      </div>
    </div>
  )
}

export default PokeVarietiesSkeleton
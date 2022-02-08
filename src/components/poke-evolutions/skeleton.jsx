import React from 'react'

function PokeEvolutionsSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ width: '20%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      <div style={{ display: 'flex', gap: '57px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c' }}></div>
      </div>
    </div>
  )
}

export default PokeEvolutionsSkeleton

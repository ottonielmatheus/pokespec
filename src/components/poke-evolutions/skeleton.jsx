import React from 'react'

function PokeEvolutionsSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <span style={{ width: '84px', height: '20px' }}></span>
      <div style={{ display: 'flex', gap: '42px', padding: '8px 24px' }}>
        <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
        <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
        <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
      </div>
    </div>
  )
}

export default PokeEvolutionsSkeleton

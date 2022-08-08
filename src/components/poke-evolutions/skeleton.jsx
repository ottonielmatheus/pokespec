import React from 'react'

function PokeEvolutionsSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', height: '52px', alignItems: 'center' }}>
        <span style={{ width: '84px', height: '20px', justifySelf: 'flex-start' }}></span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '386px' }}>
        <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
        <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
        <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
      </div>
    </div>
  )
}

export default PokeEvolutionsSkeleton

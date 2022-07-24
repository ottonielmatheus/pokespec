import React from 'react'

function PokeVarietiesSkeleton() {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ width: '20%', height: '22px' }}></span>
        <span style={{ width: '5%', height: '10px', justifySelf: 'end' }}></span>
      </div>
      <div style={{ display: 'flex', gap: '42px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
          <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
          <span style={{ width: '30px', height: '30px', borderRadius: '50%', position: 'absolute', top: '-20px', right: '-22px' }}></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
          <span style={{ width: '90px', height: '90px', borderRadius: '50%' }}></span>
          <span style={{ width: '30px', height: '30px', borderRadius: '50%', position: 'absolute', top: '-20px', right: '-22px' }}></span>
        </div>
      </div>
    </div>
  )
}

export default PokeVarietiesSkeleton
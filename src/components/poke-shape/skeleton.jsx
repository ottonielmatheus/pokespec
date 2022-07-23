import React from 'react'

function PokeShapeSkeleton () {
  return (
    <>
      <div className='skeleton' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '12px' }}>
          <span style={{ width: '64px', height: '22px' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: '50px', height: '50px', borderRadius: '50%' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px', padding: '12px' }}>
          <span style={{ width: '30px', height: '20px' }}></span>
          <span style={{ width: '40px', height: '10px' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px', padding: '12px' }}>
          <span style={{ width: '30px', height: '20px' }}></span>
          <span style={{ width: '30px', height: '10px' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px', padding: '12px' }}>
          <span style={{ width: '30px', height: '20px' }}></span>
          <span style={{ width: '30px', height: '10px' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px', padding: '12px' }}>
          <span style={{ width: '30px', height: '20px' }}></span>
          <span style={{ width: '50px', height: '10px' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px', padding: '12px' }}>
          <span style={{ width: '30px', height: '20px' }}></span>
          <span style={{ width: '150px', height: '10px' }}></span>
          <span style={{ width: '30px', height: '10px' }}></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
          <span style={{ width: '30px', height: '20px' }}></span>
          <span style={{ width: '150px', height: '10px' }}></span>
          <span style={{ width: '30px', height: '10px' }}></span>
        </div>
      </div>
    </>
  )
}

export default PokeShapeSkeleton
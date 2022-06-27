import React from 'react'

function PokeShapeSkeleton () {
  const css = `
    .pokemon-shape--skeleton {
      border: solid .5px #2e2e2e;
      border-radius: 5px;
    }
  `
  return (
    <>
      <style>{css}</style>
      <div className='pokemon-shape--skeleton'
        style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '12px' }}>
          <div className='skeleton' style={{ width: '64px', height: '22px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
          <div className='skeleton' style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c'}}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '150px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '150px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
      </div>
    </>
  )
}

export default PokeShapeSkeleton
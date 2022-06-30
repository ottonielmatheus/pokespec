import React from 'react'

function PokeShapeSkeleton () {
  const css = `
    .pokemon-shape--skeleton__head, .pokemon-shape--skeleton__row {
      padding: 12px;
    }
  `
  return (
    <>
      <style>{css}</style>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='pokemon-shape--skeleton__head' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
          <div className='skeleton' style={{ width: '64px', height: '22px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='skeleton' style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2c2c2c'}}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '40px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '50px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid 0.5px #2e2e2e' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '150px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
        <div className='pokemon-shape--skeleton__row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className='skeleton' style={{ width: '30px', height: '20px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '150px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
          <div className='skeleton' style={{ width: '30px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        </div>
      </div>
    </>
  )
}

export default PokeShapeSkeleton
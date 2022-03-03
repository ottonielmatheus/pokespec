import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import './index.scss'

function PokeNavigationSkeleton () {
  return (
    <div className='navigation' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        <BsArrowLeft size={22} />
        <div className='skeleton' style={{ width: '50px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>

      <div style={{ display: 'flex' }}>
        <div className='skeleton' style={{ width: '100px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>

      <div style={{ display: 'flex' }}>
        <div className='skeleton' style={{ width: '50px', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <BsArrowRight size={22} />
      </div>

    </div>
  )
}

export default PokeNavigationSkeleton
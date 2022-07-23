import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

import './index.scss'

function PokeNavigationSkeleton () {
  return (
    <div className='navigation primary-box skeleton' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        <BsArrowLeft size={22} />
        <span style={{ width: '50px', height: '10px' }}></span>
      </div>

      <div className='skeleton' style={{ display: 'flex' }}>
        <span style={{ width: '100px', height: '10px' }}></span>
      </div>

      <div className='skeleton' style={{ display: 'flex' }}>
        <span style={{ width: '50px', height: '10px' }}></span>
        <BsArrowRight size={22} />
      </div>

    </div>
  )
}

export default PokeNavigationSkeleton
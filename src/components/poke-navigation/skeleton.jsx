import React from 'react'
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg'

import './index.scss'

function PokeNavigationSkeleton () {
  return (
    <div className='navigation__box skeleton'>
      <div className='navigation' style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--primary-color)',
        padding: '0 16px'
      }}>
        <div style={{ width: '30%', display: 'flex', alignSelf: 'center', justifyContent: 'flex-start', gap: '8px' }}>
          <CgArrowLongLeft size={22} />
          <span style={{ width: '100px', height: '22px' }}></span>
        </div>

        <div style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>
          <span style={{ width: '120px', height: '22px' }}></span>
        </div>

        <div style={{ width: '30%', display: 'flex', alignSelf: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <span style={{ width: '100px', height: '22px' }}></span>
          <CgArrowLongRight size={22} />
        </div>
      </div>

    </div>
  )
}

export default PokeNavigationSkeleton
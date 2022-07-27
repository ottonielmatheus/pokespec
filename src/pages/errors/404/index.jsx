import React from 'react'

import './index.scss'

import notFoundImage from './../../../components/shared/not-found.png'
import pikachuNotFoundImage from './../../../components/shared/not-found-pikachu.png'

function NotFound () {
  return (
    <div className='not-found'>
      <div className='not-found__images'>
        <img className='not-found' src={notFoundImage} alt='not found' />
        <img className='pikachu' src={pikachuNotFoundImage} alt="pikachu sleeping" />
      </div>
      <div className='not-found__container'>
        <div className='not-found__container__limit'>
          <h1>NOT FOUND</h1>
          <p>Probably pikachu ended up burning some server circuits and we couldn&apos;t find this resource for you :(</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
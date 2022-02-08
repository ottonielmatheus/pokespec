import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

import notFoundImage from './../../../components/shared/not-found.png'

function NotFound () {
  return (
    <div id='not-found-page'>
      <div>
        <img src={notFoundImage} alt="not found" />
        <h1>NOT FOUND</h1>
        <p>Nothing here, but you can know more about this <span><Link to={'/pokemons/psyduck'}>pokemon</Link></span>.</p>
      </div>
    </div>
  )
}

export default NotFound
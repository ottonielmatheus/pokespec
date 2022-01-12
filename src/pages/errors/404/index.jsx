import React from 'react'

import './index.scss'

import notFoundImage from './../../../components/shared/not-found.png'

function NotFound () {
  return (
    <div id='not-found-page'>
      <div>
        <img src={notFoundImage} alt="not found" />
        <h1>NOT FOUND</h1>
        <p>Nothing here, but you can know more about this <span><a href="/pokemons/psyduck">pokémon</a></span>.</p>
      </div>
    </div>
  )
}

export default NotFound
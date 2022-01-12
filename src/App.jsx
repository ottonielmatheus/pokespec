import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NotFound from './pages/errors/404'
import Home from './pages/home'
import PokemonDetails from './pages/pokemon-details'

function App () {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='pokemons/:pokemonName' element={<PokemonDetails />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
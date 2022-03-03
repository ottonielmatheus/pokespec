import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'

import NotFound from './pages/errors/404'
import Home from './pages/home'
import PokemonDetails from './pages/pokemon-details'
import Footer from './components/footer'

function App () {
  return (
  <>
    <HashRouter>
      <Routes>
        <Route path='pokemons/:pokemonName' element={<PokemonDetails />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </HashRouter>
    <Footer />
  </>
  )
}

export default App
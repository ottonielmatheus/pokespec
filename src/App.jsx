import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'

import NotFound from './pages/errors/404'
import Home from './pages/home'
import About from './pages/about'
import PokemonDetails from './pages/pokemon-details'
import Header from './components/header'
import Footer from './components/footer'

import { PokemonContextProvider } from './contexts/pokemon.context'

function App () {
  return (
  <>
    <PokemonContextProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='pokemons/:pokemonName' element={<PokemonDetails />} />
        </Routes>
        <Footer />
      </HashRouter>
    </PokemonContextProvider>
  </>
  )
}

export default App
import React, { createContext, useContext, useState, useEffect } from 'react'
import { store } from './../core/storage'
import pokemonApi from './../core/apis/pokemon.api'

const PokemonContext = createContext()

export function PokemonContextProvider ({ children }) {
  const [loading, setLoading] = useState(true)
  const [gameVersion, setGameVersion] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(async () => {
    await downloadAllPokemonsToStore()

    setIsMobile(getCurrentMedia().matches)
    const listener = addEventListener('resize', () => {
      setIsMobile(getCurrentMedia().matches)
    })
    return () => removeEventListener('resize', listener)
  }, [])

  const downloadAllPokemonsToStore = async () => {
    const { count } = await pokemonApi.pokemons.getAll({ limit: 1 })
    const storedPokemonsCount = await store('pokemonsSearch').count()

    if (count > storedPokemonsCount) {
      const { results } = await pokemonApi.pokemons.getAll({ limit: count })
      for (const pokemon of results) {
        store('pokemonsSearch').add(pokemon)
      }
    }
  }

  const getCurrentMedia = () => window.matchMedia('(min-width: 320px) and (max-width: 1200px)')

  return (
    <PokemonContext.Provider value={{
      loading, setLoading,
      gameVersion, setGameVersion,
      isMobile, setIsMobile
    }}>
      { children }
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => useContext(PokemonContext)

import React, { createContext, useContext, useState } from 'react'

const PokemonContext = createContext()

export function PokemonContextProvider ({ children }) {
  const [loading, setLoading] = useState(true)

  return (
    <PokemonContext.Provider value={{ loading, setLoading }}>
      { children }
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => useContext(PokemonContext)

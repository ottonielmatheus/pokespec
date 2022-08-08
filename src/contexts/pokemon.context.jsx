import React, { createContext, useContext, useState } from 'react'

const PokemonContext = createContext()

export function PokemonContextProvider ({ children }) {
  const [loading, setLoading] = useState(true)
  const [gameVersion, setGameVersion] = useState(null)

  return (
    <PokemonContext.Provider value={{
      loading, setLoading,
      gameVersion, setGameVersion
    }}>
      { children }
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => useContext(PokemonContext)

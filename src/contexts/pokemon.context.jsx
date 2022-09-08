import React, { createContext, useContext, useState, useEffect } from 'react'

const PokemonContext = createContext()

export function PokemonContextProvider ({ children }) {
  const [loading, setLoading] = useState(true)
  const [gameVersion, setGameVersion] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(getCurrentMedia().matches)
    const listener = addEventListener('resize', () => {
      setIsMobile(getCurrentMedia().matches)
    })
    return () => removeEventListener('resize', listener)
  }, [])

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

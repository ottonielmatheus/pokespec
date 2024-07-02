import React from 'react'
import pokemonLogo from './../shared/logos/pokemon-logo.png'

export default function PokemonListSkeleton () {
  return (
    <>
      <div className='pokemon-list skeleton' style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        {Array.from(Array(10)).map((_, index) => <div key={index}
          style={{
            width: '257.2px',
            height: '257.2px',
            position: 'relative',
            gap: '8px',
            opacity: '0.7',
            borderRadius: 'var(--global-border-radius)',
            backgroundColor: 'var(--primary-color)'
        }}>
          <div style={{ width: '100%', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ width: '50%', animation: 'loading-logo-pulse 2s infinite ease' }} src={pokemonLogo} alt="pokemon" />
          </div>
        </div>)}
      </div>
    </>
  )
}

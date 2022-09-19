import React, { useEffect } from 'react'
import { usePokemonContext } from '../../contexts/pokemon.context'

import DefaultPokemonImage from '../shared/default-pokemon-image'

function PokeProfileSkeleton () {
  const { isMobile } = usePokemonContext()

  useEffect(() => {
  }, [isMobile])

  return (
    <>
      <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '230px', height: '230px', opacity: '.5' }}>
            <DefaultPokemonImage width='200' height='200' />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center'  }}>
            <div style={{ display: 'flex', gap: '6px', justifyContent: isMobile ? 'center' : 'initial' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%' }}></span>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: isMobile ? 'center' : 'initial', alignItems: 'flex-end' }}>
              <span style={{ width: '145px', height: '32px' }}></span>
              <span style={{ width: '123px', height: '41px' }}></span>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: isMobile ? 'center' : 'initial' }}>
              <span style={{ width: '71px', height: '22px' }}></span>
              <span style={{ width: '98px', height: '22px' }}></span>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: isMobile ? 'center' : 'initial', alignItems: 'flex-end' }}>
              <span style={{ width: '72px', height: '16px' }}></span>
              <span style={{ width: '42px', height: '18px' }}></span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
          <div style={{ width: isMobile ? '350px' : '400px', height: isMobile ? '350px' : '400px', float: 'left' }}>
          </div>
          <div style={{
            width: isMobile ? '100%' : '30%',
            display: 'flex',
            gap: '24px',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ width: '30px', height: '15px' }}></span>
              <div style={{ display: 'flex', gap: '8px' }}>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ width: '30px', height: '15px' }}></span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ width: '30px', height: '15px' }}></span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ width: '30px', height: '15px' }}></span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ width: '30px', height: '15px' }}></span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PokeProfileSkeleton
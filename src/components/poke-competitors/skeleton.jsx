import React from 'react'
import { IoClose } from 'react-icons/io5'
import { BsDash } from 'react-icons/bs'

import './index.scss'
import DefaultPokemonImage from '../shared/default-pokemon-image'

function PokeCompetitorsSkeleton() {
  return (
    <div className='poke-competitors skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{
          display: 'grid',
          gridAutoFlow: 'row',
          gap: '8px',
        }}>
        <span className='competitor primary' style={{ height: '473px' }}>
          <div className='competitor__header'>
            <div></div>
            <div className='competitor__header__actions'>
              <button className='icon'><BsDash /></button>
              <button className='icon'><IoClose /></button>
            </div>
          </div>
          <div style={{
              display: 'flex',
              height: '174px',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '8px 12px'
            }}>
              <DefaultPokemonImage type='versus' width='150' height='150' />
          </div>
        </span>
      </div>
    </div>
  )
}

export default PokeCompetitorsSkeleton

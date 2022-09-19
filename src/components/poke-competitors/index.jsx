import React, { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { BsDash } from 'react-icons/bs'

import { usePokemonContext } from '../../contexts/pokemon.context'
import { store } from '../../core/storage'
import pokemonApi from '../../core/apis/pokemon.api'

import './index.scss'
import PokeCompetitorsSkeleton from './skeleton'
import PokeProfile from '../poke-profile'

function pokeCompetitors ({ competitorsNames = [], diffTo, onChange, onClose, onEmpty }) {
  const { loading } = usePokemonContext()
  const [competitors, setCompetitors] = useState([])
  const [selectedCompetitorIndex, setSelectedCompetitorIndex] = useState(0)

  useEffect(async () => {
    const pokemons = await Promise.all(competitorsNames.map(async competitor => {
      const storedPokemon = await store('pokemonsSearch').get(competitor)
      return storedPokemon?.avatar ? storedPokemon : await pokemonApi.pokemons.getByName(competitor)
    }))

    setCompetitors(pokemons)
    setSelectedCompetitorIndex(pokemons.length - 1)
    onChange(pokemons[pokemons.length - 1])
  }, [competitorsNames])

  const selectCompetitor = (competitorIndex) => {
    setSelectedCompetitorIndex(competitorIndex)
    onChange(competitors[competitorIndex])
  }

  const deleteCompetitor = (deletedCompetitor) => {
    const selectedCompetitor = competitors[selectedCompetitorIndex]
    const updatedCompetitors = competitors.filter(competitor => deletedCompetitor.name !== competitor.name)
    if (selectedCompetitor.name === deletedCompetitor.name) {
      if (!updatedCompetitors.length > 0) {
        onEmpty()
      }
    }

    setSelectedCompetitorIndex(0)
    setCompetitors(updatedCompetitors)
    onClose(deletedCompetitor.name)
    onChange(updatedCompetitors[0])
  }

  const minimizeCompetitor = () => {
    setSelectedCompetitorIndex(null)
    onChange(null)
  }

  return loading
    ? <PokeCompetitorsSkeleton />
    : <div className='poke-competitors'>
        {
          competitors.map((competitor, index) => (
            <div key={index} className={'competitor' + (selectedCompetitorIndex === index ? '--selected' : '')}>
              <div className='competitor__header'>
                {
                  selectedCompetitorIndex !== index &&
                  <div className='competitor__header__pokemon' onClick={() => selectCompetitor(index)}>
                    {competitor?.avatar?.default && <img src={competitor?.avatar?.default} alt={competitor?.name} />}
                    <span>{competitor?.name}</span>
                  </div>
                }
                <div className='competitor__header__actions'>
                  {(selectedCompetitorIndex === index) && <button className='icon' onClick={minimizeCompetitor}><BsDash /></button>}
                  <button className='icon' onClick={() => deleteCompetitor(competitor)}><IoClose /></button>
                </div>
              </div>
              <div className='competitor__body'>
                {
                  selectedCompetitorIndex === index &&
                  <PokeProfile stats short pokemon={competitor} diff={diffTo} />
                }
              </div>
            </div>
          ))
        }
      </div>
}

export default pokeCompetitors
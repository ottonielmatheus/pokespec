import React, { useState } from 'react'

import { store } from './../../core/storage'

import './index.scss'
import CustomSearch from '../shared/inputs/custom-search'
import PokeType from './../poke-type'

function PokeSearch ({ placeholder, onSearch }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [navigationIndex, setNavigationIndex] = useState(-1)
  const [pokemonSuggestions, setPokemonSuggestions] = useState([])
  const [query, setQuery] = useState()

  const getPokemonSuggestions = async (query) => {
    let suggestions = []
    query = query.toLowerCase().trim()

    if (query) {
      suggestions = await store('pokemonsSearch').getAll({ like: query }, { offset: 4 })
    }

    setNavigationIndex(-1)
    setShowSuggestions(suggestions.length)
    setPokemonSuggestions(suggestions)
    setQuery(query)
  }

  const navigateOnSuggestions = (key) => {
    let index = navigationIndex

    if (key === 'ArrowDown' && index < pokemonSuggestions.length - 1) index++
    if (key === 'ArrowUp' && index > 0) index--

    setNavigationIndex(index)
  }

  const highlightOnMatch = (name) => {
    return name.toLowerCase().replace(query, `<span style="font-weight: 650">${query}</span>`)
  }

  const searchPokemon = () => {
    if (pokemonSuggestions[navigationIndex]) {
      onSearch(pokemonSuggestions[navigationIndex].name)
    }
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchPokemon()
      setShowSuggestions(false)
    }

    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      navigateOnSuggestions(event.key)
    }

    if (event.ctrlKey && event.code === 'Space' && !query) {
      getPokemonSuggestions('a')
    }

    if (event.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleOnSearch = (suggestion) => {
    setShowSuggestions(false)
    onSearch(suggestion)
  }

  return (
    <div className='poke-search'>
      <div className='poke-search__overlay' style={{ visibility: showSuggestions ? 'visible' : 'hidden' }}
        onClick={() => setShowSuggestions(false)}></div>
        <CustomSearch placeholder={placeholder}
          onFocus={() => setShowSuggestions(pokemonSuggestions.length > 0)}
          onChange={async (e) => await getPokemonSuggestions(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      {
        pokemonSuggestions.length > 0 &&
        <div className={`poke-search__suggestions${showSuggestions ? '--visible' : ''}`}>
            {
              pokemonSuggestions.map((suggestion, index) => (
                <div key={index} className='poke-search__suggestions__item' onClick={() => handleOnSearch(suggestion.name)}>
                  <div className={`poke-search__suggestions__item__pokemon${index === navigationIndex ? '--selected' : ''}`}>
                    <div className='poke-search__suggestions__item__pokemon__avatar-name'>
                    {suggestion.avatar?.any && <img src={suggestion.avatar.default} />}
                      <span className='name' dangerouslySetInnerHTML={{ __html: highlightOnMatch(suggestion.name) }}></span>
                    </div>
                    <div className='poke-search__suggestions__item__pokemon__types-varieties'>
                      {suggestion.types?.map((type, index) => (<PokeType hiddeLabel key={index} type={type} />))}
                    </div>
                  </div>
                </div>
              ))
            }
        </div>
      }
    </div>
  )
}

export default PokeSearch
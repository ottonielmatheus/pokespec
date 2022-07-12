import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

import './index.scss'
import { store } from './../../core/storage'
import PokeType from './../poke-type'

function PokeSearch () {
  const navigate = useNavigate()
  const queryInput = useRef()

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [navigationIndex, setNavigationIndex] = useState(-1)
  const [storedPokemons, setStoredPokemons] = useState([])
  const [pokemonSuggestions, setPokemonSuggestions] = useState([])

  useEffect(async () => {
    setStoredPokemons(await store('pokemonsSearch').getAll())
  }, [showSuggestions, pokemonSuggestions])

  const getPokemonSuggestions = async (query) => {
    let suggestions = []
    query = query.toLowerCase().trim()

    if (query) {
      suggestions = storedPokemons
        .filter(pokemon => pokemon.name.toLowerCase().includes(query))
        .slice(0, 4)
    }

    setNavigationIndex(-1)
    setShowSuggestions(suggestions.length)
    setPokemonSuggestions(suggestions)
  }

  const navigateOnSuggestions = (key) => {
    let index = navigationIndex

    if (key === 'ArrowDown' && index < pokemonSuggestions.length - 1) index++
    if (key === 'ArrowUp' && index > 0) index--

    setNavigationIndex(index)
  }

  const highlightOnMatch = (name) => {
    const query = queryInput.current.value.toLowerCase().trim()
    return name.toLowerCase().replace(query, `<span style="font-weight: 650">${query}</span>`)
  }

  const goToPokemon = (id) => {
    setShowSuggestions(false)
    navigate(`/pokemons/${id}`)
  }

  const handleInputKeyDown = (event) => {
    const query = event.target.value.toLowerCase().trim()

    if (event.key === 'Enter') {
      if (pokemonSuggestions[navigationIndex]) {
        goToPokemon(pokemonSuggestions[navigationIndex].name)
      } else if (query) {
        goToPokemon(query)
      }
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

  return (
    <div className='poke-search'>
      <div className='poke-search__overlay'
        style={{ visibility: showSuggestions ? 'visible' : 'hidden' }}
        onClick={() => setShowSuggestions(false)}></div>
      <div className='poke-search__input-group'>
        <input className='poke-search__input-group__input' type="text" placeholder='Search pokemon' autoComplete='off'
          ref={queryInput}
          onFocus={() => setShowSuggestions(pokemonSuggestions.length > 0)}
          onChange={async (e) => await getPokemonSuggestions(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <div className='poke-search__input-group__icon'>
          <BsSearch color='#fff' size={16} />
        </div>
      </div>
      {
        pokemonSuggestions.length > 0 &&
        <div className={`poke-search__suggestions${showSuggestions ? '--visible' : ''}`} id='poke-search__suggestions'>
            {
              pokemonSuggestions.map((suggestion, index) => (
                <div key={index}
                    className={`poke-search__suggestions__pokemon${index === navigationIndex ? '--selected' : ''}`}
                    onClick={() => goToPokemon(suggestion.name)}
                  >
                  <div className='poke-search__suggestions__pokemon__avatar-name'>
                    {suggestion.sprites?.front_default && <img src={suggestion.sprites.front_default} />}
                    <span className='name' dangerouslySetInnerHTML={{ __html: highlightOnMatch(suggestion.name) }}></span>
                  </div>
                  <div className='poke-search__suggestions__pokemon__types-varieties'>
                    {suggestion.types?.map((type, index) => (<PokeType key={index} type={type} />))}
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
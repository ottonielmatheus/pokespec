import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'
import { map, sortBy } from 'lodash'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'
import { fromVersion } from '../../core/pokemon.utils'

import './index.scss'
import PokeMovesSkeleton from './skeleton'
import CustomSelect from './../shared/custom-select'
import MoveDetails from './move-details'

function PokeMoves ({ pokemonMoves }) {
  const { loading: rootLoading, gameVersion } = usePokemonContext()
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeMoves, setPokeMoves] = useState([])
  const [allMoves, setAllMoves] = useState(0)
  const [filters, setFilters] = useState([])

  const filterOptions = [
    { label: 'egg', value: 'egg' },
    { label: 'level-up', value: 'level-up' },
    { label: 'machine', value: 'machine' }
  ]

  useEffect(async () => {
    let moves = pokemonMoves
      .map(item => {
        const moveDetails = fromVersion(item.version_group_details, gameVersion)
        return {
          learn: {
            atLevel: moveDetails?.level_learned_at,
            method: moveDetails?.move_learn_method?.name
          },
          move: item.move
        }
      })

    moves = sortBy(moves, [
      item => item.learn.method,
      item => item.learn.atLevel,
      item => item.move.name
    ])

    moves = applyFilters(moves, filters)

    setAllMoves(moves)
    await getMovesDetails(moves?.slice(0, 5))
  }, [pokemonMoves, filters, gameVersion])

  const getMovesDetails = async (moves, isToAppend = false) => {
    setLoadingMore(true)
    if (!moves) return

    const requests = moves
      .map(async item => {
        return {
          learn: item.learn,
          ...await pokemonApi.moves.getByName(item.move.name)
        }
      })

    const formatedMoves = await Promise.all(requests)

    if (isToAppend) {
      setPokeMoves(pokeMoves.concat(formatedMoves))
    } else {
      setPokeMoves(formatedMoves)
    }
    setLoadingMore(false)
  }

  const applyFilters = (moves, filters) => {
    if (filters.length) {
      moves = moves.filter(move => {
        const matchLearnMethod = map(filters, 'value').includes(move.learn.method)
        return matchLearnMethod
      })
    }
    return moves
  }

  return rootLoading ? <PokeMovesSkeleton /> : (
    <div className='poke-moves'>
      <div className='poke-moves__header'>
        <span>Moves</span>
        <div className='poke-moves__header__filters'>
          <CustomSelect isMulti className='select-move-categories'
            placeholder='Select learn methods'
            options={filterOptions}
            onChange={setFilters}
            value={filters}
          />
        </div>
        <span className='total-items'>{pokeMoves?.length || 0}/{allMoves.length}</span>
      </div>
      <div className='poke-moves__body'>
        {pokeMoves?.map((move, index) => (
          <Fade key={index}>
            <div className='move'>
              <div className='move-header'>
                <div className='move-header-name'>
                  <img src={move?.type?.icon} alt={move?.type} />
                  <span style={{ color: move?.type?.color }}>{move?.name}</span>
                </div>
                <div className='move-header-tags'>
                    <MoveDetails type={move?.type}
                      learn={move?.learn}
                      category={move?.category}
                      effect={move?.effect}
                      power={move?.power} />
                  </div>
                  <div className='move-header-values'>
                    {
                      move?.pp &&
                      <small className='pp' style={{ color: move?.type?.color }}>
                        <strong>{move?.pp}</strong><strong>{move?.pp}</strong>
                      </small>
                    }
                  </div>
              </div>
              <span className='move-description'>
                {move?.shortDescription?.replaceAll('$effect_chance', move?.effectChance) || <i>nothing about.</i>}
              </span>
            </div>
          </Fade>
        ))}
        {
          loadingMore ?
          <div className='loading-more'><ReactLoading className='loading' type='bubbles' /></div>
          : (pokeMoves?.length < allMoves.length) &&
            <div className='load-more' onClick={
              async () => await getMovesDetails(allMoves?.slice(pokeMoves.length, pokeMoves.length + 5), true)
            }>
              <small>load more</small>
            </div>
        }
      </div>
    </div>
  )
}

export default PokeMoves

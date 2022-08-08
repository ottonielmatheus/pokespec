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

function PokeMoves ({ pokemonMoves }) {
  const { loading: rootLoading, gameVersion } = usePokemonContext()
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeMoves, setPokeMoves] = useState([])
  const [allMoves, setAllMoves] = useState(0)
  const [selectedMethods, setSelectedMethods] = useState([])

  useEffect(async () => {
    let moves = pokemonMoves
      .map(item => {
        const moveDetails = fromVersion(item.version_group_details, gameVersion)
        return {
          atLevel: moveDetails?.level_learned_at,
          learnMethod: moveDetails?.move_learn_method?.name,
          move: item.move
        }
      })

    if (selectedMethods.length) {
      moves = moves.filter(item => map(selectedMethods, 'value').includes(item.learnMethod))
    }

    moves = sortBy(moves, [
      item => item.learnMethod,
      item => item.atLevel,
      item => item.move.name
    ])

    setAllMoves(moves)
    await getMovesDetails(moves?.slice(0, 3))
  }, [pokemonMoves, selectedMethods, gameVersion])

  const getMovesDetails = async (moves, isToAppend = false) => {
    setLoadingMore(true)
    if (!moves) return

    const requests = moves
      .map(async item => {
        return {
          atLevel: item.atLevel,
          learnMethod: item.learnMethod,
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

  return rootLoading ? <PokeMovesSkeleton /> : (
    <div className='poke-moves'>
      <div className='poke-moves__header'>
        <span>Moves</span>
        <div className='poke-moves__header__filters'>
          <CustomSelect isMulti className='select-move-categories'
            placeholder='Select learn methods'
            options={[
              { label: 'egg', value: 'egg' },
              { label: 'level-up', value: 'level-up' },
              { label: 'machine', value: 'machine' }
            ]}
            onChange={setSelectedMethods}
            value={selectedMethods}
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
                    {
                      move?.learnMethod &&
                      <small>
                        {
                          (move?.learnMethod === 'level-up' && move?.atLevel) &&
                          <span className='value'>lvl. {move?.atLevel}</span>
                        }
                        {
                          move?.learnMethod !== 'level-up' &&
                          <span>{move?.learnMethod}</span>
                        }
                      </small>
                    }
                  </div>
                  <div className='move-header-values'>
                    {
                      move?.category &&
                      <small className={`category-${move.category}`}
                        style={{ backgroundColor: move?.type?.color }}>
                        {move.category}
                      </small>
                    }
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

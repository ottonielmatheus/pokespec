import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'
import { BsLightningChargeFill } from 'react-icons/bs'
import { BiTargetLock } from 'react-icons/bi'

import './index.scss'
import PokeMovesSkeleton from './skeleton'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'

function PokeMoves ({ pokemonMoves }) {
  const { loading: rootLoading } = usePokemonContext()
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeMoves, setPokeMoves] = useState([])

  useEffect(async () => {
    await getMovesDetails(pokemonMoves?.slice(0, 2))
  }, [pokemonMoves])

  const getMovesDetails = async (moves, isToAppend = false) => {
    setLoadingMore(true)
    if (!moves) return

    const requests = moves.map(item => pokemonApi.moves.getByName(item.move.name))
    const movesResult = await Promise.all(requests)
    const formatedMoves = await pokemonUtils.formatMoves(movesResult)

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
        <span className='total-items'>{pokeMoves?.length || 0}/{pokemonMoves?.length}</span>
      </div>
      <div className='poke-moves__body'>
        {pokeMoves?.map((move, index) => (
          <Fade key={index}>
            <div className='move'>
              <div className='move-header'>
                <div className='move-header-name'>
                  <img src={move?.type?.icon} alt={move?.type} />
                  <span
                    style={{ color: move?.type?.color }}>
                    {move?.name}
                  </span>
                </div>
                <div className='move-header-values'>
                  {
                    move?.power &&
                    <div className='move-header-damage'>
                      <span style={{ color: move?.type?.color }}>
                        <BsLightningChargeFill /> {move?.power}
                      </span>
                    </div>
                  }
                  {
                    move?.accuracy &&
                    <div className='move-header-accuracy'>
                      <span style={{ color: move?.type?.color }}>
                        <BiTargetLock /> {move?.accuracy}%
                      </span>
                    </div>
                  }
                  {
                    move?.pp &&
                    <div className='move-header-pp'>
                      <span style={{ color: move?.type?.color }}>
                        <strong>PP</strong> {move?.pp}
                      </span>
                    </div>
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
          : (pokeMoves?.length < pokemonMoves?.length) &&
            <div className='load-more' onClick={
              async () => await getMovesDetails(pokemonMoves?.slice(pokeMoves.length, pokeMoves.length + 5), true)
            }>
              <small>load more</small>
            </div>
        }
      </div>
    </div>
  )
}

export default PokeMoves

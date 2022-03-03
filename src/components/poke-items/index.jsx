import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'
import Tippy from '@tippyjs/react'
import { followCursor } from 'tippy.js'

import 'tippy.js/dist/tippy.css'
import './index.scss'

import pokemonApi from '../../core/apis/pokemon.api'
import pokemonUtils from '../../core/pokemon.utils'

function PokeItems ({ pokemonItems }) {
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeItems, setPokeItems] = useState()

  useEffect(async () => {
    await getItemsDetails(pokemonItems?.slice(0, 5))
  }, [pokemonItems])

  const getItemsDetails = async (items, isToAppend = false) => {
    setLoadingMore(true)

    if (!items) return

    const requests = items.map(async data => {
      const detailedItem = await pokemonApi.drops.getByUrl(data.item.url)
      return {
        ...detailedItem
      }
    })
    items = await Promise.all(requests)

    const formatedItems = pokemonUtils.formatItems(items)
    setPokeItems(formatedItems)

    if (isToAppend) {
      setPokeItems(pokeItems.concat(formatedItems))
    } else {
      setPokeItems(formatedItems)
    }

    setLoadingMore(false)
  }

  return (
    <div className='poke-items'>
      <div className='poke-items__header'>
        <span>Drops</span>
        <span className='total-items'>{pokeItems?.length || 0}/{pokemonItems?.length}</span>
      </div>
      <div className='poke-items__body'>
        {pokeItems?.map((item, index) => (
          <Fade key={index}>
            <Tippy className={`tippy-tooltip item-theme`}
              plugins={[followCursor]}
              followCursor={true}
              arrow={false}
              content={
                <div>
                  <div className='head'>
                    <span>{item.name}</span>
                    <span>P$ {item.cost}</span>
                  </div>
                  <div className='body'>
                    <p>{item.description}</p>
                  </div>
                </div>
              }>
              <div className='item'>
                <img src={item.image} alt={item.name} />
              </div>
            </Tippy>
          </Fade>
        ))}
        {
          loadingMore ? <div className='loading-more'><ReactLoading type='bubbles' color='#2e2e2e' /></div> :
          (pokeItems?.length < pokemonItems?.length) &&
          <div className='item load-more'
            onClick={async () => {
              const currentItemsPage = pokemonItems?.slice(pokeItems.length, pokeItems.length + 1)
              await getItemsDetails(currentItemsPage, true)
            }}>
            <strong>+</strong>
          </div>
        }
      </div>
    </div>
  )
}

export default PokeItems
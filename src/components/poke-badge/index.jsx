import React, { useEffect, useState } from 'react'
import getCharacteristicImage from './../shared/characteristics'
import Tippy from '@tippyjs/react'

import './index.scss'

function PokeBadge ({ badge, type = 'full' }) {
  const [badgeImage, setBadgeImage] = useState()

  useEffect(async () => {
    const characteristicImage = {
      gmax: 'mega',
      mega: 'mega',
      'mega-x': 'mega',
      'mega-y': 'mega',
      eternamax: 'mega',
      alola: 'alola',
      galar: 'galar'
    }[badge]
    setBadgeImage(await getCharacteristicImage(characteristicImage))
  })

  return (
    <div className='poke-badge'>
      {
        (badgeImage && (type === 'full' || type === 'image')) &&
        <Tippy
          className={`tippy-tooltip-badge ${badge}`}
          arrow={false}
          content={
            <div>
              <span>{badge.toUpperCase().split('-')[0]}</span>
            </div>
          }
          >
          {badgeImage && <img className={`poke-badge__image ${badge}`} src={badgeImage} alt={badge} />}
        </Tippy>
      }
      {
        (type === 'full' || type === 'text') &&
        <span className='poke-badge__title'>
          {badge?.toUpperCase().replaceAll('-', ' ')}
        </span>
      }
    </div>
  )
}

export default PokeBadge
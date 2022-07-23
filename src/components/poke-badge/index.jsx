import React, { useEffect, useState } from 'react'
import getCharacteristicImage from './../shared/characteristics'

import './index.scss'

function PokeBadge ({ badge, type = 'full' }) {
  const [badgeImage, setBadgeImage] = useState()

  useEffect(async () => {
    const characteristicImage = {
      gmax: 'mega',
      mega: 'mega',
      'mega-x': 'mega',
      'mega-y': 'mega',
      eternamax: 'mega'
    }[badge]
    setBadgeImage(await getCharacteristicImage(characteristicImage))
  })

  return (
    <div className='poke-badge'>
      {
        (badgeImage && (type === 'full' || type === 'image')) &&
        <img className={`poke-badge__image ${badge}`} src={badgeImage} alt={badge} />
      }
      {
        (type === 'full' || type === 'text') &&
        <p className='poke-badge__title'>
          {badge?.toUpperCase()}
        </p>
      }
    </div>
  )
}

export default PokeBadge
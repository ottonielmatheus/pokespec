import React from 'react'
import Tippy from '@tippyjs/react'
import _ from 'lodash'

import './index.scss'


function PokeType ({ type }) {
  return (
    <Tippy
      className={`tippy-tooltip ${type.name}-theme`}
      arrow={false}
      content={
        <div>
          <span>{_.capitalize(type.name)}</span>
        </div>
      }
      >
        <a href={`/types/${type.name}`}>
          <img src={type.icon} alt={type.name} />
        </a>
    </Tippy>
  )
}

export default PokeType

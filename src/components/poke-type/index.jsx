import React from 'react'
import { Link } from 'react-router-dom'
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
        <Link to={`/types/${type.name}`}>
          <img src={type.icon} alt={type.name} />
        </Link>
    </Tippy>
  )
}

export default PokeType

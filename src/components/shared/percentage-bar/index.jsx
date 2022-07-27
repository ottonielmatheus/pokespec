import React from 'react'

import './index.scss'


function PercentageBar ({ className, colors, values }) {
  return (
    <div className={`percentage-bar ${className || ''}`}>
      {
        values.map((value, index) => (<div key={index} style={{ width: `${value}%`, backgroundColor: colors[index] }}></div>))
      }
    </div>
  )
}

export default PercentageBar

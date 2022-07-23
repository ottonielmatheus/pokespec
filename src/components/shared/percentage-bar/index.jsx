import React from 'react'

import './index.scss'


function PercentageBar ({ className, color, value }) {
  return (
    <div className={`secondary-box percentage-bar ${className || ''}`}>
      <div style={{ width: `${value}%`, backgroundColor: color }}></div>
    </div>
  )
}

export default PercentageBar

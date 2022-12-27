import React, { useState } from 'react'
import RangeSlider from 'react-range-slider-input/dist/components/RangeSlider'

import './index.scss'

function CustomRangeInput ({ defaultValue, onChange, min = 0, max = 100, unique = false }) {
  const [minValue, setMinValue] = useState(defaultValue[0] || min)
  const [maxValue, setMaxValue] = useState(defaultValue[1] || max)

  const handleOnChange = ([ newMinValue, newMaxValue ]) => {
    setMinValue(newMinValue)
    setMaxValue(newMaxValue)
    onChange({ minValue: newMinValue, maxValue: newMaxValue })
  }

  console.log(defaultValue)

  return (
    <div className='range-input'>
      <RangeSlider className='range-input__range'
        onInput={handleOnChange}
        min={min}
        max={max}
        defaultValue={[minValue, maxValue]}
        thumbsDisabled={[unique, false]} rangeSlideDisabled={unique} />
      <div className='range-input__literals'>
          {
            !unique &&
            <input className={`range-input__literals__min ${(minValue < min) ? 'invalid' : ''}`}
              type='number'
              min={min}
              max={max}
              value={minValue}
              defaultValue={defaultValue[0]}
              onChange={(e) => setMinValue(e.target.value)} />
          }
          <input className={`range-input__literals__max ${(maxValue > max) ? 'invalid' : ''}`}
            type='number'
            min={min}
            max={max}
            value={maxValue}
            defaultValue={defaultValue[1]}
            onChange={(e) => setMaxValue(e.target.value)} />
      </div>
    </div>
  )
}

export default CustomRangeInput
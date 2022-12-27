import React from 'react'
import { v4 } from 'uuid'
import './index.scss'

export function CustomRadioGroup ({ defaultValue, children, onChange }) {
  const name = v4()
  const childs = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { name, onChange, checked: (child.props.value === defaultValue) })
    }
    return child
  })

  return (
    <div className='custom-radio-group'>
      {childs}
    </div>
  )
}

export function RadioOption ({ name, value, children, onChange, checked = false }) {
  return (
    <div className='radio-option-group'>
      <input name={name}
        type='radio'
        onChange={e => onChange(e.target.value)}
        value={value}
        defaultChecked={checked} />
      <label className='radio-option-group__label'>{children}</label>
    </div>
  )
}
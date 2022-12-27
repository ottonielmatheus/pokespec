import React from 'react'
import { BsSearch } from 'react-icons/bs'

import './index.scss'

function CustomSearch ({ placeholder, onFocus, onChange, onKeyDown }) {
  return (
    <div className='custom-search'>
      <input className='custom-search__input'
        type='text' placeholder={placeholder} autoComplete='off'
        onFocus={onFocus}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className='custom-search__icon'>
        <BsSearch size={16} />
      </div>
    </div>
  )
}

export default CustomSearch
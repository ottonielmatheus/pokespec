import React from 'react'
import { keys, capitalize } from 'lodash'

import PokemonNaturesMapper from '../../../core/mappers/pokemon-natures.mapper'

import './index.scss'
import CustomRangeInput from '../../shared/inputs/custom-range-input'
import CustomSelect from '../../shared/inputs/custom-select'
import { CustomRadioGroup, RadioOption } from '../../shared/inputs/custom-radio-input'

function SimulationParams ({ fighterParams, onChange }) {
  const natureOptions = keys(PokemonNaturesMapper).map(key => ({ label: capitalize(key), value: key }))

  const handleOnChange = (paramName, value) => {
    fighterParams[paramName] = value
    onChange(fighterParams)
  }

  return (
    <div className='simulation-params'>
      {fighterParams?.level}{fighterParams?.genre}{fighterParams?.nature?.value}
      <div className='simulation-params__input-group'>
        <span>Level</span>
        <CustomRangeInput unique defaultValue={[0, fighterParams?.level]}
          onChange={({ maxValue }) => handleOnChange('level', maxValue)} />
      </div>
      <div className='simulation-params__input-group'>
        <span>Genre</span>
        <CustomRadioGroup name='genre' defaultValue={fighterParams?.genre}
          onChange={(genre) => handleOnChange('genre', genre)}>
          <RadioOption value='male'>Male</RadioOption>
          <RadioOption value='female'>Female</RadioOption>
        </CustomRadioGroup>
      </div>
      <div className='simulation-params__input-group'>
        <span>Nature</span>
        <CustomSelect placeholder='Select nature'
          onChange={(option) => handleOnChange('nature', option.value)}
          defaultValue={fighterParams?.nature}
          options={natureOptions} />
      </div>
    </div>
  )
}

export default SimulationParams
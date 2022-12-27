import React, { useEffect, useState } from 'react'
import { capitalize, groupBy } from 'lodash'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'

import './index.scss'
import CustomSelect from './../shared/inputs/custom-select'

function GameVersions ({ versions }) {
  const { setGameVersion } = usePokemonContext()
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState()

  useEffect(async () => {
    let groupOptions = [{ label: 'N/A', value: null }]

    if (versions?.length) {
      const games = await Promise.all(versions.map(item => pokemonApi.games.getByUrl(item.version.url)))
      const versionGroups = Object.keys(groupBy(games, 'group'))
      groupOptions = versionGroups.map(group => {
        return { label: group.split('-').map(capitalize).join(' '), value: group }
      })
    }

    setOptions(groupOptions)
    setSelectedOption(groupOptions[0])
    setGameVersion(groupOptions[0].value)
  }, [versions])

  return (
    <div className='games-versions'>
      <CustomSelect
        value={selectedOption}
        options={options}
        isDisabled={!versions?.length}
        onChange={
          (option) => {
            setSelectedOption(option)
            setGameVersion(option.value)
          }
        }
      />
    </div>
  )
}

export default GameVersions
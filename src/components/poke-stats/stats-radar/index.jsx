import React, { useEffect, useState } from 'react'
import { map } from 'lodash'
import hexToRgba from 'hex-to-rgba'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

import { usePokemonContext } from '../../../contexts/pokemon.context'

import './index.scss'

function StatsRadar ({ color, stats, diffTo }) {
  const { theme } = usePokemonContext()
  const [mainColor, setMainColor] = useState('#ccc')
  const [diffColor, setDiffColor] = useState('#ccc')
  const [gridColor, setGridColor] = useState('#2f2f2f')

  useEffect(() => {
    const themeConstrastColor = (theme === 'dark') ? '#ccc' : '#000'

    if (diffTo) {
      setDiffColor(map(diffTo.types, 'color').find(diffColor => diffColor !== color) || themeConstrastColor)
    }

    setMainColor(color || themeConstrastColor)
    setGridColor(theme === 'dark' ? '#2f2f2f' : '#ccc')
  }, [theme, diffTo])

  const renderRadarLabel = (stat, diffStat) => diffTo ? `(${stat || 0} vs ${diffStat || 0})` : `(${stat || 0})`

  return (
    <div className='stats-radar'>
      <Radar data={{
        labels: [
          ['HP', renderRadarLabel(stats?.hp.baseValue, diffTo?.stats.hp.baseValue)],
          ['Defense', renderRadarLabel(stats?.defense.baseValue, diffTo?.stats.defense.baseValue)],
          ['Sp Defense', renderRadarLabel(stats?.specialDefense.baseValue, diffTo?.stats.specialDefense.baseValue)],
          ['Speed', renderRadarLabel(stats?.speed.baseValue, diffTo?.stats.speed.baseValue)],
          ['Sp Attack', renderRadarLabel(stats?.specialAttack.baseValue, diffTo?.stats.specialAttack.baseValue)],
          ['Attack', renderRadarLabel(stats?.attack.baseValue, diffTo?.stats.attack.baseValue)]
        ],
        datasets: [
          {
            data: [
              stats?.hp.baseValue,
              stats?.defense.baseValue,
              stats?.specialDefense.baseValue,
              stats?.speed.baseValue,
              stats?.specialAttack.baseValue,
              stats?.attack.baseValue
            ],
            fill: true,
            borderColor: mainColor,
            backgroundColor: hexToRgba(mainColor, 0.3)
          },
          {
            data: [
              diffTo?.stats.hp.baseValue,
              diffTo?.stats.defense.baseValue,
              diffTo?.stats.specialDefense.baseValue,
              diffTo?.stats.speed.baseValue,
              diffTo?.stats.specialAttack.baseValue,
              diffTo?.stats.attack.baseValue
            ],
            fill: true,
            borderColor: diffColor,
            backgroundColor: hexToRgba(diffColor || color, 0.3)
          }
        ]
      }}
      options={{
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            RadialLinearScale: {
              min: 0,
              max: 255,
              ticks: {
                display: false
              },
              grid: {
                color: gridColor
              },
              angleLines: {
                color: gridColor
              },
              pointLabels: {
                font: {
                  size: 14,
                  weight: 600
                },
                padding: 12,
                color: ['#52b69a', '#48cae4', '#e0aaff', '#f4d35e', '#ff7f51', '#ce4257']
              }
            }
          }
        }}
      />
    </div>
  )
}

export default StatsRadar
import React from 'react'
import hexToRgba from 'hex-to-rgba'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

import './index.scss'

function StatsRadar ({ color, stats }) {
  const lineColor = color || '#2f2f2f'

  return (
    <div className='stats-radar'>
      <Radar data={{
        labels: [
          ['HP', `(${stats?.hp.baseValue})`],
          ['Defense', `(${stats?.defense.baseValue})`],
          ['Sp Defense', `(${stats?.specialDefense.baseValue})`],
          ['Speed', `(${stats?.speed.baseValue})`],
          ['Sp Attack', `(${stats?.specialAttack.baseValue})`],
          ['Attack', `(${stats?.attack.baseValue})`]
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
            fill: true
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
                color: '#2f2f2f'
              },
              angleLines: {
                color: '#2f2f2f'
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
          },
          borderColor: lineColor,
          backgroundColor: hexToRgba(lineColor, 0.3)
        }}
      />
    </div>
  )
}

export default StatsRadar
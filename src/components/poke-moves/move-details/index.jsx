import React from 'react'
import { capitalize } from 'lodash'
import Tippy from '@tippyjs/react'
import { FaBahai, FaSkull, FaGhost, FaSeedling } from 'react-icons/fa'
import { SiTarget } from'react-icons/si'
import { RiZzzLine, RiBubbleChartFill } from 'react-icons/ri'
import { AiFillThunderbolt } from 'react-icons/ai'
import { BsSnow, BsSnow2 } from 'react-icons/bs'
import { ImHeart, ImBlocked, ImContrast } from 'react-icons/im'
import { MdDoNotTouch, MdOutlineAnchor } from 'react-icons/md'
import { HiMusicNote } from 'react-icons/hi'
import { GoArrowUp, GoArrowDown, GoFlame } from 'react-icons/go'
import { GiShieldDisabled } from 'react-icons/gi'

import './index.scss'

function MoveDetails ({ type, category, effect, learn, power }) {
  return (
    <>
      {
        learn.method &&
        <small>
          {
            (learn.method === 'level-up' && learn.atLevel) &&
            <span className='value'>lvl. {learn.atLevel}</span>
          }
          {
            learn.method !== 'level-up' &&
            <span>{learn.method}</span>
          }
        </small>
      }
      {
        ['physical', 'special'].includes(category) &&
        <Tippy className='tippy-tooltip-move' arrow={false} content={capitalize(category)}>
          <small className='move-detail' style={{ backgroundColor: type?.color }}>
            <span>
              {category === 'physical' && <FaBahai />}
              {category === 'special' && <SiTarget />}
            </span>
            {
              power &&
              <span className='power'>
                <strong>{power}</strong>
              </span>
            }
          </small>
        </Tippy>
      }
      {
        (category === 'status' || effect?.ailment) &&
        <Tippy className='tippy-tooltip-move'
          arrow={false}
          content={capitalize(effect?.ailment?.split('-').join(' ') || 'status')}>
          <small className='move-detail' style={{ backgroundColor: type?.color }}>
            <span>
              {{
                'burn': <GoFlame />,
                'freeze': <BsSnow2 />,
                'paralysis': <AiFillThunderbolt />,
                'poison': <RiBubbleChartFill />,
                'frostbite': <BsSnow />,
                'drowsy': <RiZzzLine />,
                'sleep': <RiZzzLine />,
                'infatuation': <ImHeart />,
                'confusion': '𖦹',
                'disable': <ImBlocked />,
                'embargo': <MdDoNotTouch />,
                'trap': <MdOutlineAnchor />,
                'nightmare': <FaGhost />,
                'perish-song': <HiMusicNote />,
                'torment': <FaSkull />,
                'no-type-immunity': <GiShieldDisabled />,
                'leech-seed': <FaSeedling />
              }[effect?.ailment] || <ImContrast />}
            </span>
          </small>
        </Tippy>
      }
      {
        effect?.stat &&
        <Tippy className='tippy-tooltip-move'
          arrow={false}
          content={effect?.stage + ' stage' + (effect?.stage > 1 ? 's' : '')}>
          <small className='move-detail' style={{ backgroundColor: type?.color }}>
            <span>
              {
                effect?.stage !== null &&
                (effect?.stage >= 0 ? <GoArrowUp size={14} /> : <GoArrowDown size={14} />)
              }
              {{
                'defense': 'DEF',
                'attack': 'ATT',
                'special attack': 'SP ATT',
                'special defense': 'SP DEF',
                'speed': 'SPD',
                'accuracy': 'ACC',
                'evasion': 'EVS'
              }[effect?.stat]}
          </span>
        </small>
        </Tippy>
      }
    </>
  )
}

export default MoveDetails
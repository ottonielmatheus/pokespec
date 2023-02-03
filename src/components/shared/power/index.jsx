import React from 'react'
import Fade from 'react-reveal/Fade'
import Tippy from '@tippyjs/react'

import './index.scss'


function Power ({ value = 0, max = 0 }) {
  max = max || 0
  const lvl = max / 10
  return (
    <Tippy
      arrow={false}
      content={<span>{value}<strong>/{max}</strong></span>}>
      <div className='cone'>
        {value > (lvl * 1) && <Fade left delay={0}><div className='lvl l-1'></div></Fade>}
        {value > (lvl * 2) && <Fade left delay={200} ><div className='lvl l-2'></div></Fade>}
        {value > (lvl * 3) && <Fade left delay={400}><div className='lvl l-3'></div></Fade>}
        {value > (lvl * 4) && <Fade left delay={600}><div className='lvl l-4'></div></Fade>}
        {value > (lvl * 5) && <Fade left delay={800}><div className='lvl l-5'></div></Fade>}
        {value > (lvl * 6) && <Fade left delay={1000}><div className='lvl l-6'></div></Fade>}
        {value > (lvl * 7) && <Fade left delay={1200}><div className='lvl l-7'></div></Fade>}
        {value > (lvl * 8) && <Fade left delay={1400}><div className='lvl l-8'></div></Fade>}
        {value > (lvl * 9) && <Fade left delay={1600}><div className='lvl l-9'></div></Fade>}
        {value > (lvl * 10) && <Fade left delay={1800}><div className='lvl l-10'></div></Fade>}
      </div>
    </Tippy>
  )
}

export default Power

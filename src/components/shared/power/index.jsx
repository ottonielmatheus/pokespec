import React from 'react'
import Fade from 'react-reveal/Fade'
import Tippy from '@tippyjs/react'

import './index.scss'


function Power ({ value = 0, max = 0 }) {
  max = max || 0
  const lvl = max / 9
  return (
    <Tippy
      arrow={false}
      content={<span>{value}<strong>/{max}</strong></span>}>
      <div className='cone'>
        <Fade left delay={50}><div className={`lvl ${ value > (lvl * 1) ? 'l-1' : ''}`}></div></Fade>
        <Fade left delay={100}><div className={`lvl ${ value > (lvl * 2) ? 'l-2' : ''}`}></div></Fade>
        <Fade left delay={150}><div className={`lvl ${ value > (lvl * 3) ? 'l-3' : ''}`}></div></Fade>
        <Fade left delay={200}><div className={`lvl ${ value > (lvl * 4) ? 'l-4' : ''}`}></div></Fade>
        <Fade left delay={250}><div className={`lvl ${ value > (lvl * 5) ? 'l-5' : ''}`}></div></Fade>
        <Fade left delay={300}><div className={`lvl ${ value > (lvl *6) ? 'l-6' : ''}`}></div></Fade>
        <Fade left delay={350}><div className={`lvl ${ value > (lvl * 7) ? 'l-7' : ''}`}></div></Fade>
        <Fade left delay={400}><div className={`lvl ${ value > (lvl * 8) ? 'l-8' : ''}`}></div></Fade>
        <Fade left delay={450}><div className={`lvl ${ value > (lvl * 9) ? 'l-9' : ''}`}></div></Fade>
      </div>
    </Tippy>
  )
}

export default Power

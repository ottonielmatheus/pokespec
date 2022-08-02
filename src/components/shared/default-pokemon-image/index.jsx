import React from 'react'

function DefaultPokemonImage ({ className, width, height, fill }) {
  return (
    <svg className={className}
      width={width || '512'}
      height={height || '512'}
      fill={fill || '#fff'}
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M346.961 283.569H512C498.17 411.989 388.832 512 256 512C123.168 512 13.8297 411.989 0 283.569H165.039C176.906 322.324 213.141 350.523 256 350.523C298.859 350.523 335.094 322.324 346.961 283.569ZM346.961 228.431H512C498.17 100.011 388.832 0 256 0C123.168 0 13.8297 100.011 0 228.431H165.039C176.906 189.676 213.141 161.477 256 161.477C298.859 161.477 335.094 189.676 346.961 228.431Z' fill='white'/>
      <path fillRule="evenodd" clipRule="evenodd" d="M256 311C286.376 311 311 286.376 311 256C311 225.624 286.376 201 256 201C225.624 201 201 225.624 201 256C201 286.376 225.624 311 256 311ZM256 291C275.33 291 291 275.33 291 256C291 236.67 275.33 221 256 221C236.67 221 221 236.67 221 256C221 275.33 236.67 291 256 291Z" fill="white"/>
  </svg>
  )
}

export default DefaultPokemonImage
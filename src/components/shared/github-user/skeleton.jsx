import React from 'react'

function GitHubUserSkeleton () {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ borderRadius: '50%', width: '150px', height: '150px', alignSelf: 'center' }}></span>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ width: '152px', height: '20px', marginTop: '18px' }}></span>
        <span style={{ width: '116px', height: '10px', marginTop: '2px' }}></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ width: '70%', height: '10px' }}></span>
        <span style={{ width: '70%', height: '10px' }}></span>
        <span style={{ width: '30%', height: '10px' }}></span>
      </div>
      <span style={{ width: '50%', height: '10px', marginTop: '30px', alignSelf: 'center' }}></span>
    </div>
  )
}

export default GitHubUserSkeleton
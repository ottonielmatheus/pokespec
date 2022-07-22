import React from 'react'

function GitHubUserSkeleton () {
  return (
    <div className='skeleton' style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ borderRadius: '50%', width: '150px', height: '150px', backgroundColor: '#2c2c2c', alignSelf: 'center' }}></div>
      <div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ width: '152px', height: '20px', marginTop: '18px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '116px', height: '10px', marginTop: '2px', backgroundColor: '#2c2c2c' }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '100%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
        <div style={{ width: '90%', height: '10px', backgroundColor: '#2c2c2c' }}></div>
      </div>
      <div style={{ width: '50%', height: '10px', marginTop: '30px', alignSelf: 'center', backgroundColor: '#2c2c2c' }}></div>
    </div>
  )
}

export default GitHubUserSkeleton
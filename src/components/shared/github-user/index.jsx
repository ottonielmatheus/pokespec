import React, { useState, useEffect } from 'react'
import githubApi from './../../../core/apis/github.api'

import './index.scss'
import GitHubUserSkeleton from './skeleton'

function GitHubUser ({ username }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setUser(await githubApi.getUser(username))
    setLoading(false)
  }, [])

  return loading ? <GitHubUserSkeleton /> :
    <>
      <div className='profile__avatar'>
        <a href={user?.html_url}>
          <img width={150} src={user?.avatar_url} alt='profile picture' />
        </a>
      </div>
      <div className='profile__name'>
        <h3>{user?.name}</h3>
        <span><a href={user?.html_url}>{user?.login}</a></span>
      </div>
      <p className='profile__description'>
        <span>{user?.bio.split('\r\n\r\n')[0]}</span>
        <br />
        <br />
        <span>{user?.bio.split('\r\n\r\n')[2]}</span>
      </p>
      <span className='profile__location'>{user?.location}</span>
    </>
}

export default GitHubUser
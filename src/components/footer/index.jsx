import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  BsGithub, BsLinkedin } from 'react-icons/bs'
import { BiGitRepoForked } from 'react-icons/bi'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'

import githubApi from './../../core/apis/github.api'

import './index.scss'
import projectLogo from './../shared/logos/logo.png'

function Footer () {
  const currentYear = new Date().getFullYear()
  const [repo, setRepo] = useState()

  useEffect(async () => {
    setRepo(await githubApi.repositories.get('ottonielmatheus', 'pokespec'))
  }, [])

  return (
    <footer>
      <div className='container'>
        <div className='container__project'>
          <div className='container__project__header'>
            <img src={projectLogo} alt='project logo' />
            <div className='container__project__header__gh'>
              <span><BiGitRepoForked size={24} /> {repo?.forks}</span>
              <span><AiFillStar size={24} /> {repo?.stargazers_count}</span>
              <a href={repo?.html_url + '/issues'}><RiErrorWarningLine size={24} /> {repo?.open_issues_count}</a>
            </div>
          </div>
          <p>{repo?.description}</p>
          <a href={repo?.html_url}><button>Contribute</button></a>
        </div>
        <div className='container__nav'>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About</li></Link>
          </ul>
        </div>
        <div className='container__actions'></div>
      </div>
      <div className='footer'>
        <div className='footer__limit'>
          <small>© {currentYear} {repo?.name}, Inc.</small>
          <div className='footer__limit__social'>
            <a href='https://github.com/ottonielmatheus'>
              <BsGithub size={24} />
            </a>
            <a href='https://www.linkedin.com/in/ottoniel-matheus-de-souza-756a64170/'>
              <BsLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
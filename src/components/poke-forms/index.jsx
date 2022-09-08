import React, { useEffect, useState } from 'react'
import Fade from 'react-reveal/Fade'
import ReactLoading from 'react-loading'

import { usePokemonContext } from '../../contexts/pokemon.context'
import pokemonApi from '../../core/apis/pokemon.api'

import './index.scss'
import PokeFormsSkeleton from './skeleton'
import PokeProfile from '../poke-profile'


function PokeForms ({ pokemonForms }) {
  const { loading: rootLoading } = usePokemonContext()
  const [allForms, setAllForms] = useState()
  const [loadingMore, setLoadingMore] = useState(false)
  const [pokeForms, setPokeForms] = useState()

  useEffect(async () => {
    setAllForms(pokemonForms)
    await getFormsDetails(pokemonForms?.slice(0, 2))
  }, [pokemonForms])

  const getFormsDetails = async (forms, isToAppend = false) => {
    setLoadingMore(true)

    if (!forms) return

    const requests = forms.map(async ({ url }) => { return pokemonApi.forms.getByUrl(url) })
    forms = await Promise.all(requests)

    setPokeForms(forms)

    if (isToAppend) {
      setPokeForms(pokeForms.concat(forms))
    } else {
      setPokeForms(forms)
    }

    setLoadingMore(false)
  }

  return rootLoading ? <PokeFormsSkeleton /> : (
    <div className='poke-forms'>
      <div className='poke-forms__body'>
        {pokeForms?.map((form, index) => (
          <Fade key={index}>
            <div className='form'>
              <PokeProfile short pokemon={form} />
            </div>
          </Fade>
        ))}
        {
          loadingMore ? <div className='loading-more'>
            <ReactLoading className='loading' type='spin' width={50} height={50} />
          </div>
          : (pokeForms?.length < allForms?.length) &&
            <Fade>
              <div className='form load-more'
                onClick={async () => {
                  const currentFormsPage = allForms?.slice(pokeForms.length, pokeForms.length + 5)
                  await getFormsDetails(currentFormsPage, true)
                }}>
                <strong>+</strong>
              </div>
            </Fade>
        }
      </div>
    </div>
  )
}

export default PokeForms
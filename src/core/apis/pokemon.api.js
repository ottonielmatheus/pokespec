const apiUrl = 'https://pokeapi.co/api/v2/'

const querify = (limit, skip) => {
  const queries = []

  if (skip) queries.push('skip=' + skip)
  if (limit) queries.push('limit=' + limit)

  return '?' + queries.join('&')
}

const getAll = async ({ skip, limit, next }) => {
  const res = await fetch(next || apiUrl + 'pokemon' + querify(limit, skip))
  const body = await res.json()
  return body
}

const getById = async (id) => {
  try {
    const res = await fetch(apiUrl + `pokemon/${id}`)
    const body = await res.json()
    return body
  } catch (err) {
    return null
  }
}

const getByName = async (name) => {
  try {
    const res = await fetch(apiUrl + `pokemon/${name}`)
    const body = await res.json()
    return body
  } catch (err) {
    return null
  }
}

const getAbilityByName = async (name) => {
  const res = await fetch(apiUrl + `ability/${name}`)
  const body = await res.json()
  return body
}

const getMoveByName = async (name) => {
  const res = await fetch(apiUrl + `move/${name}`)
  const body = await res.json()
  return body
}

const getSpecieByName = async (name) => {
  const res = await fetch(apiUrl + `pokemon-species/${name}`)
  const body = await res.json()
  return body
}

const getEvolutionByUrl = async (url) => {
  const res = await fetch(url)
  const body = await res.json()
  return body
}

export default {
  pokemons: {
    getAll,
    getById,
    getByName
  },
  abilities: {
    getByName: getAbilityByName
  },
  moves: {
    getByName: getMoveByName
  },
  species: {
    getByName: getSpecieByName
  },
  evolution: {
    getByUrl: getEvolutionByUrl
  }
}
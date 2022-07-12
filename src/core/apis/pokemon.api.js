const apiUrl = 'https://pokeapi.co/api/v2/'

const querify = (limit, skip) => {
  const queries = []

  if (skip) queries.push('skip=' + skip)
  if (limit) queries.push('limit=' + limit)

  return '?' + queries.join('&')
}

const getAll = async ({ skip, limit, next }) => {
  const uri = next || apiUrl + 'pokemon' + querify(limit, skip)
  const res = await fetch(uri)
  const body = await res.json()

  return body
}

const getById = async (id) => {
  try {
    const uri = apiUrl + `pokemon/${id}`
    const res = await fetch(uri)
    const body = await res.json()

    return body
  } catch (err) {
    return null
  }
}

const getByName = async (name) => {
  try {
    const uri =apiUrl + `pokemon/${name}`
    const res = await fetch(uri)
    const body = await res.json()

    return body
  } catch (err) {
    return null
  }
}

const getByUrl = async (url) => {
  try {
    const res = await fetch(url)
    const body = await res.json()

    return body
  } catch (err) {
    return null
  }
}

const getAbilityByName = async (name) => {
  const uri = apiUrl + `ability/${name}`
  const res = await fetch(uri)
  const body = await res.json()

  return body
}

const getMoveByName = async (name) => {
  const res = await fetch(apiUrl + `move/${name}`)
  const body = await res.json()
  return body
}

const getSpecieByUrl = async (url) => {
  const res = await fetch(url)
  const body = await res.json()
  return body
}

const getEvolutionByUrl = async (url) => {
  const res = await fetch(url)
  const body = await res.json()
  return body
}

const getItemByUrl = async (url) => {
  const res = await fetch(url)
  const body = await res.json()
  return body
}

export default {
  pokemons: {
    getAll,
    getById,
    getByUrl,
    getByName
  },
  abilities: {
    getByName: getAbilityByName
  },
  moves: {
    getByName: getMoveByName
  },
  species: {
    getByUrl: getSpecieByUrl
  },
  evolution: {
    getByUrl: getEvolutionByUrl
  },
  drops: {
    getByUrl: getItemByUrl
  }
}
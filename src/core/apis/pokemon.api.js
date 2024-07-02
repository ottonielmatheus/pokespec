import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import {
  formatAbility,
  formatEvolution,
  formatItem,
  formatMove,
  formatPokemon,
  formatSpecies,
  formatGameVersion
} from './../pokemon.utils'

const API_URL = 'https://pokeapi.co/api/v2/'
const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta/',
  cache: new InMemoryCache()
})

const querify = (limit, skip) => {
  const queries = []

  if (skip) queries.push('skip=' + skip)
  if (limit) queries.push('limit=' + limit)

  return '?' + queries.join('&')
}

const request = async uri => {
  if (!uri) return null
  const res = await fetch(uri)
  if (!res.ok) return null
  return res.json()
}

const requestGQL = async (query, variables) => {
  const { error, data } = await client.query({ query, variables })
  if (error) return null
  return data
}

const formatWith = (formatterFunction, requestFunctions) => {
  const requests = {}
  for (const requestKey of Object.keys(requestFunctions)) {
    requests[requestKey] = async (...args) => {
      const resource = await requestFunctions[requestKey](...args)
      return formatterFunction(resource)
    }
  }
  return requests
}

const searchPokemons = async (where, options) => {
  const query = gql`
    query ($where: pokemon_v2_pokemon_bool_exp, $skip: Int, $limit: Int) {
      items: pokemon_v2_pokemon (
        where: $where,
        order_by: { id: asc },
        offset: $skip,
        limit: $limit
      ) {
        id
        name
        order
        weight
        height
        pokemon_v2_pokemonstats {
          base_stat
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `
  const vars = {
    where,
    skip: options.skip,
    limit: options.limit
  }

  const { items } = await requestGQL(query, vars)
  return items.map(pokemon => ({
    types: pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => ({ name: pokemon_v2_type.name })),
    stats: pokemon.pokemon_v2_pokemonstats.map(({ base_stat }) => ({ base_stat })),
    sprites: pokemon.pokemon_v2_pokemonsprites[0].sprites,
    ...pokemon
  }))
}

const getAll = async ({ skip = 0, limit = 20, next }) => {
  const uri = next || API_URL + 'pokemon' + querify(limit, skip)
  return request(uri)
}

const getById = async (id) => {
  return request(API_URL + `pokemon/${id}`)
}

const getPokemonByName = async (name) => {
  if (!name) return null
  return request(API_URL + `pokemon/${name}`)
}

const getAbilityByName = async (name) => {
  return request(API_URL + `ability/${name}`)
}

const getMoveByName = async (name) => {
  return request(API_URL + `move/${name}`)
}

export default {
  pokemons: {
    getAll,
    search: searchPokemons,
    getPokemonsPage: request,
    ...formatWith(formatPokemon, {
      getById,
      getByName: getPokemonByName,
      getByUrl: request,
    })
  },
  abilities: formatWith(formatAbility, {
    getByName: getAbilityByName
  }),
  moves: formatWith(formatMove, {
    getByName: getMoveByName
  }),
  species: formatWith(formatSpecies, {
    getByUrl: request
  }),
  evolution: formatWith(formatEvolution, {
    getByUrl: request
  }),
  items: formatWith(formatItem, {
    getByUrl: request
  }),
  forms: formatWith(formatPokemon, {
    getByUrl: request
  }),
  games: formatWith(formatGameVersion, {
    getByUrl: request
  })
}
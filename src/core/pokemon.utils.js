import { chain, endsWith, find, capitalize, concat } from 'lodash'

import i18n from './i18n'
import pokeTypeMapper from './mappers/pokemon-types.mapper'
import getHabitatImage from '../components/shared/habitats'
import getShapeImage from '../components/shared/shapes'
import getCharacteristicImage from '../components/shared/characteristics'

import pokemonApi from './apis/pokemon.api'

export const fromVersion = (versionList, version) => {
  return find(versionList, data => data.version_group.name === version)
}

export const mapElementType = async (typeName) => {
  const type = pokeTypeMapper[typeName]
  return {
    name: typeName,
    icon: await type.icon
  }
}

export const formatType = async (t) => {
  let type = null

  if ('slot' in t) {
    type = pokeTypeMapper[t.type.name]
    type.name = t.type.name
  } else {
    type = pokeTypeMapper[t.name]
    type.name = t.name
  }

  return {
    name: type.name,
    icon: await type.icon,
    color: type.color,
    background: await type.background,
    weakness: type.weakness,
    resistance: type.resistance,
    immune: type.immune
  }
}

export const formatTypes = async (types) => {
  if (!types) {
    return []
  }

  return await Promise.all(types.map(formatType))
}

export const formatName = (name) => {
  let genre = null

  if (/(-f|-m)$/.test(name)) {
    genre = endsWith(name, '-f') ? 'female' : 'male'
  }

  const regions = [
    { name: 'alola', regex: /(-alola)/ },
    { name: 'galar', regex: /(-galar)/ },
    { name: 'hisui', regex: /(-hisui)/ },
  ]

  const modifiers = [
    { name: 'mega', regex: /(-mega)$/ },
    { name: 'mega-x', regex: /(-mega-x)$/ },
    { name: 'mega-y', regex: /(-mega-y)$/ },
    { name: 'gmax', regex: /(-gmax)$/ },
    { name: 'eternamax', regex: /(-eternamax)$/ }
  ]

  const pokeRegion = find(regions, region => region.regex.test(name))
  const pokeModifier = find(modifiers, modifier => modifier.regex.test(name))

  const formatedName = name.replace(/(-f|-m|-mega|-mega-x|-mega-y|-gmax|-eternamax|-alola|-galar|-hisui)$/, '')
    .split('-')
    .map(capitalize)
    .join(' ')

  return {
    genre,
    formatedName,
    region: pokeRegion?.name,
    modifier: pokeModifier?.name
  }
}

export const getStatsDiff = (stats, field, statsA) => {
  if (!stats) return 0

  const statB = getStatsValue(stats, field)
  const result = statsA.baseValue - statB.baseValue
  const diffValue = Math.abs(result)

  return {
    baseValue: diffValue,
    basePercentage: (diffValue / 255) * 100,
    signal: result > 0 ? '+' : '-'
  }
}

export const getStatsValue = (stats, field) => {
  if (!stats) return 0

  const stat = chain(stats)
    .map(s => ({ name: s.stat.name, value: s.base_stat }))
    .find(['name', field])
    .value()

  return {
    baseValue: stat.value,
    basePercentage: (stat.value / 255) * 100
  }
}

export const getMainAbility = async (abilities) => {
  const mainAbility = find(abilities, ['is_hidden', false])
  const ability = await pokemonApi.abilities.getByName(mainAbility.ability.name)
  return {
    id: mainAbility.name,
    name: ability.name,
    total: abilities.length - 1
  }
}

export const formatAbility = (ability) => {
  return {
    id: ability.name,
    name: i18n(ability.names)?.name,
    description: i18n(ability.effect_entries)?.effect || null,
    shortDescription: i18n(ability.effect_entries)?.short_effect || null,
    hidden: ability.hidden
  }
}

export const formatAbilities = (abilities) => {
  return chain(abilities)
    .map(formatAbility)
    .orderBy('hidden')
    .value()
}

export const formatMove = async (move) => {
  return {
    id: move.name,
    name: i18n(move.names).name,
    category: move.damage_class.name,
    description: i18n(move.effect_entries)?.effect,
    shortDescription: i18n(move.effect_entries)?.short_effect,
    type: await formatType(move.type),
    power: move.power,
    effectChance: move.effect_chance,
    accuracy: move.accuracy,
    pp: move.pp
  }
}

export const formatMoves = async (moves) => {
  const formatedMoves = moves.map(formatMove)
  return await Promise.all(formatedMoves)
}

export const getWeaknessAndResistance = async (types) => {
  const mergedTypes = {
    immune: [],
    weakness: [],
    resistance: []
  }

  for (const type of types) {
    mergedTypes.immune = concat(mergedTypes.immune, type.immune)
    mergedTypes.weakness = concat(mergedTypes.weakness, type.weakness)
    mergedTypes.resistance = concat(mergedTypes.resistance, type.resistance)
  }

  const result = {
    weakness: chain(mergedTypes.weakness).difference(mergedTypes.resistance),
    resistance: chain(mergedTypes.resistance).difference(mergedTypes.weakness),
    immune: mergedTypes.immune
  }

  result.weakness = await Promise.all(result.weakness.map(mapElementType))
  result.resistance = await Promise.all(result.resistance.map(mapElementType))
  result.immune = await Promise.all(result.immune.map(mapElementType))

  return result
}

export const getEffectiveness = (weakness, resistance, immune) => {
  const multipliers = chain(resistance)
    .map(r => ({ type: r, calc: total => total / 2 }))
    .concat(weakness.map(w => ({ type: w, calc: total => total * 2 })))
    .concat(immune.map(i => ({ type: i, calc: total => total * 0 })))
    .keyBy(item => item.type.name)
    .value()

  const total = {}
  const types = concat(weakness, resistance, immune)

  for (const type of types) {
    total[type.name] = {
      ...multipliers[type.name].type,
      value: multipliers[type.name].calc(total[type.name]?.value || 1)
    }
  }


  return chain(total)
    .groupBy('value')
    .value()
}

export const formatEvolution = ({ chain }) => {
  if (!chain) return null
  return {
    evolves: {
      trigger: chain.evolution_details[0]?.trigger?.name,
      onLevel: chain.evolution_details[0]?.min_level,
      withItem: {
        name: chain.evolution_details[0]?.item?.name,
        url: chain.evolution_details[0]?.item?.url
      }
    },
    pokemon: { name: chain.species.name },
    next: chain.evolves_to.map(chain => formatEvolution({ chain }))
  }
}

export const formatSpecies = async (species) => {
  let characteristic = null

  if (species.is_baby) {
    characteristic = { name: 'Baby', image: await getCharacteristicImage('baby') }
  }

  if (species.is_mythical) {
    characteristic = { name: 'Mythical', image: await getCharacteristicImage('mythical') }
  }

  if (species.is_legendary) {
    characteristic = { name: 'Legendary', image: await getCharacteristicImage('legendary') }
  }

  const generationNumber = species.generation.name.split('-')[1]

  return {
    originalName: i18n(species.names, 'ja').name,
    varieties: species.varieties,
    genus: i18n(species.genera).genus,
    habitat: {
      name: species.habitat?.name,
      image: await getHabitatImage(species.habitat?.name)
    },
    shape: {
      color: species.color.name,
      name: species.shape?.name,
      image: await getShapeImage(species.shape?.name)
    },
    happiness: {
      base: species.base_happiness,
      percentage: (species.base_happiness / 255) * 100
    },
    growthRate: species.growth_rate.name,
    captureRate: (species.capture_rate / 255) * 100,
    about: i18n(species.flavor_text_entries).flavor_text.replace('', ' '),
    generation: 'Generation ' + generationNumber.toUpperCase(),
    characteristic,
    evolutionChain: species.evolution_chain
  }
}

export const formatItem = (item) => {
  return {
    name: i18n(item.names).name,
    image: item.sprites.default,
    cost: item.cost,
    description: i18n(item.flavor_text_entries).text || null,
    effect: i18n(item.effect_entries).short_effect || null
  }
}

export const formatItems = (items) => {
  return items.map(formatItem)
}

export const formatVarieties = (varieties) => {
  return varieties.map(variety => {
    const { region, modifier } = formatName(variety.name)
    return {
      badges: { region, modifier },
      default: variety.is_default,
      ...variety
    }
  })
}

export const formatSprites = (sprites) => {
  const avatars = [
    sprites?.other?.['official-artwork']?.front_default,
    sprites?.front_default
  ]
  return {
    artwork: avatars[0],
    default: avatars[1],
    any: avatars.find(Boolean)
  }
}

export const formatGameVersion = (game) => {
  return {
    name: game.name,
    group: game.version_group.name
  }
}

export const formatPokemon = async (pokemon) => {
  if (!pokemon) return null

  const { formatedName, modifier, region, genre } = formatName(pokemon.name)
  const types = await formatTypes(pokemon.types)
  const { weakness, resistance, immune } = await getWeaknessAndResistance(types)

  return {
    ...pokemon,
    avatar: formatSprites(pokemon.sprites),
    formatedName,
    modifier,
    region,
    genre,
    types,
    weakness,
    resistance,
    immune,
    effectiveness: getEffectiveness(weakness, resistance, immune)
  }
}
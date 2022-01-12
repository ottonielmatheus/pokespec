import _ from 'lodash'

import i18n from './i18n'
import pokeTypeMapper from './mappers/pokemon-types.mapper'
import pokemonApi from './apis/pokemon.api'

const mapElementType = async (typeName) => {
  const type = pokeTypeMapper[typeName]
  return {
    name: typeName,
    icon: await type.icon
  }
}

const formatType = async (t) => {
  const type = pokeTypeMapper[t.name]
  return {
    name: t.name,
    icon: await type.icon,
    color: type.color,
    background: await type.background,
    weakness: type.weakness,
    resistance: type.resistance,
    immune: type.immune
  }
}

const formatTypes = async (types) => {
  if (!types) {
    return []
  }

  const formatedTypes = types.map(async t => await formatType(t.type))
  return await Promise.all(formatedTypes)
}

const formatName = (name) => {
  let genre = null

  if (/(-f|-m)$/.test(name)) {
    genre = _.endsWith(name, '-f') ? 'female' : 'male'
  }

  const modifiers = [
    { name: 'mega', regex: /(-mega)$/ },
    { name: 'mega-x', regex: /(-mega-x)$/ },
    { name: 'mega-y', regex: /(-mega-y)$/ },
    { name: 'gmax', regex: /(-gmax)$/ },
    { name: 'eternamax', regex: /(-eternamax)$/ }
  ]

  const pokeModifier = _.find(modifiers, modifier => modifier.regex.test(name))

  return {
    genre,
    modifier: pokeModifier?.name,
    formatedName: _.capitalize(name).replace(/(-f|-m|-mega|-mega-x|-mega-y|-gmax|-eternamax)$/, '')
  }
}

const getStatsValue = (stats, field) => {
  if (stats) {
    const stat = _.chain(stats)
      .map(s => ({ name: s.stat.name, value: s.base_stat}))
      .find(['name', field]).value()
    return stat.value
  }
  return 0
}

const getMainAbility = async (abilities) => {
  const mainAbility = _.find(abilities, ['is_hidden', false])
  const ability = await pokemonApi.abilities.getByName(mainAbility.ability.name)
  return {
    id: mainAbility.ability.name,
    name: i18n(ability.names).name,
    total: abilities.length - 1
  }
}

const formatAbilities = (abilities) => {
  return abilities.map(ability => ({
    id: ability.name,
    name: i18n(ability.names).name,
    description: i18n(ability.effect_entries).effect || null,
    shortDescription: i18n(ability.effect_entries).short_effect || null,
    hidden: ability.is_hidden
  }))
}

const formatMoves = async (moves) => {
  const formatedMoves = moves.map(async move => ({
    id: move.name,
    name: i18n(move.names).name,
    description: i18n(move.effect_entries).effect,
    shortDescription: i18n(move.effect_entries).short_effect,
    type: await formatType(move.type),
    power: move.power,
    effectChance: move.effect_chance
  }))
  return await Promise.all(formatedMoves)
}

const getWeaknessAndResistance = async (types) => {
  const mergedTypes = {
    immune: [],
    weakness: [],
    resistance: []
  }

  for (const type of types) {
    mergedTypes.immune = _.concat(mergedTypes.immune, type.immune)
    mergedTypes.weakness = _.concat(mergedTypes.weakness, type.weakness)
    mergedTypes.resistance = _.concat(mergedTypes.resistance, type.resistance)
  }

  const result = {
    weakness: _.chain(mergedTypes.weakness).uniq().difference(mergedTypes.resistance),
    resistance: _.chain(mergedTypes.resistance).uniq().difference(mergedTypes.weakness),
    immune: _.uniq(mergedTypes.immune)
  }

  result.weakness = await Promise.all(result.weakness.map(mapElementType))
  result.resistance = await Promise.all(result.resistance.map(mapElementType))
  result.immune = await Promise.all(result.immune.map(mapElementType))

  return result
}

const getEffectiveness = (weakness, resistance, immune) => {

  const multipliers = _.chain(resistance)
    .map(r => ({ type: r, calc: total => total / 2 }))
    .concat(weakness.map(w => ({ type: w, calc: total => total * 2 })))
    .concat(immune.map(i => ({ type: i, calc: total => total * 0 })))
    .keyBy(item => item.type.name)
    .value()

  const total = {}
  const types = _.concat(weakness, resistance, immune)

  for (const type of types) {
    total[type.name] = {
      ...multipliers[type.name].type,
      value: multipliers[type.name].calc(total[type.name]?.value || 1)
    }
  }

  return _.chain(total)
    .groupBy('value')
    .value()
}

const formatEvolutions = (evolution) => {
  const pokemonId = /\/(\d{1,})\//.exec(evolution.species.url)[1]
  return {
    trigger: evolution.evolution_details[0]?.trigger?.name,
    pokemon: { id: pokemonId },
    next: evolution.evolves_to.map(formatEvolutions)
  }
}

export default {
  formatName,
  formatTypes,
  formatAbilities,
  formatMoves,
  formatEvolutions,
  getStatsValue,
  getMainAbility,
  getWeaknessAndResistance,
  getEffectiveness
}
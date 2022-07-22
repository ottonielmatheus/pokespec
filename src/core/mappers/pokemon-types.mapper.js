const getIcon = async (type) => (await import(`./../../components/shared/types/${type}.png`)).default
const getBackground = async (type) => (await import(`./../../components/shared/scenares/${type}.jpg`)).default

const pokeTypeMapper = {
  grass: {
    color: '#63bb5b',
    icon: getIcon('grass'),
    background: getBackground('grass'),
    weakness: ['flying', 'poison', 'bug', 'fire', 'ice'],
    resistance: ['grass', 'water', 'electric', 'ground'],
    immune: []
  },
  fire: {
    color: '#ff9c54',
    icon: getIcon('fire'),
    background: getBackground('fire'),
    weakness: ['ground', 'rock', 'water'],
    resistance: ['bug', 'steel', 'fire', 'ice', 'grass', 'fairy'],
    immune: []
  },
  bug: {
    color: '#95c436',
    icon: getIcon('bug'),
    background: getBackground('bug'),
    weakness: ['flying', 'rock', 'fire'],
    resistance: ['fighting', 'ground', 'grass'],
    immune: []
  },
  dragon: {
    color: '#0e70c5',
    icon: getIcon('dragon'),
    background: getBackground('dragon'),
    weakness: ['ice', 'dragon', 'fairy'],
    resistance: ['fire', 'water', 'grass', 'electric'],
    immune: []
  },
  fairy: {
    color: '#ec8fe6',
    icon: getIcon('fairy'),
    background: getBackground('fairy'),
    weakness: ['poison', 'steel'],
    resistance: ['fighting', 'bug', 'dark'],
    immune: ['dragon']
  },
  ghost: {
    color: '#5167a9',
    icon: getIcon('ghost'),
    background: getBackground('ghost'),
    weakness: ['ghost', 'dark'],
    resistance: ['poison', 'bug'],
    immune: ['normal', 'fighting']
  },
  ground: {
    color: '#d97746',
    icon: getIcon('ground'),
    background: getBackground('ground'),
    weakness: ['water', 'grass', 'ice'],
    resistance: ['poison', 'rock'],
    immune: ['electric']
  },
  normal: {
    color: '#9099a1',
    icon: getIcon('normal'),
    background: getBackground('normal'),
    weakness: ['fighting'],
    resistance: [],
    immune: ['ghost']
  },
  psychic: {
    color: '#f97176',
    icon: getIcon('psychic'),
    background: getBackground('psychic'),
    weakness: ['bug', 'ghost', 'dark'],
    resistance: ['fighting', 'psychic'],
    immune: []
  },
  steel: {
    color: '#5a8ea1',
    icon: getIcon('steel'),
    background: getBackground('steel'),
    weakness: ['fighting', 'steel', 'ground', 'fire'],
    resistance: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
    immune: ['poison']
  },
  dark: {
    color: '#827693',
    icon: getIcon('dark'),
    background: getBackground('dark'),
    weakness: ['fighting', 'bug', 'fairy'],
    resistance: ['ghost', 'dark'],
    immune: ['psychic']
  },
  electric: {
    color: '#f3d23b',
    icon: getIcon('electric'),
    background: getBackground('electric'),
    weakness: ['ground'],
    resistance: ['flying', 'steel', 'electric'],
    immune: []
  },
  fighting: {
    color: '#ce4069',
    icon: getIcon('fighting'),
    background: getBackground('fighting'),
    weakness: ['flying', 'psychic', 'fairy'],
    resistance: ['rock', 'bug', 'dark'],
    immune: []
  },
  flying: {
    color: '#92aade',
    icon: getIcon('flying'),
    background: getBackground('flying'),
    weakness: ['rock', 'electric', 'ice'],
    resistance: ['fighting', 'bug', 'grass'],
    immune: ['ground']
  },
  ice: {
    color: '#74cec0',
    icon: getIcon('ice'),
    background: getBackground('ice'),
    weakness: ['fighting', 'rock', 'steel', 'fire'],
    resistance: ['ice'],
    immune: []
  },
  poison: {
    color: '#ab6ac8',
    icon: getIcon('poison'),
    background: getBackground('poison'),
    weakness: ['ground', 'psychic'],
    resistance: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
    immune: []
  },
  rock: {
    color: '#c7b78b',
    icon: getIcon('rock'),
    background: getBackground('rock'),
    weakness: ['fighting', 'ground', 'steel', 'water', 'grass'],
    resistance: ['normal', 'flying', 'poison', 'fire'],
    immune: []
  },
  water: {
    color: '#4d90d5',
    icon: getIcon('water'),
    background: getBackground('water'),
    weakness: ['grass', 'electric'],
    resistance: ['steel', 'fire', 'water', 'ice'],
    immune: []
  }
}

export default pokeTypeMapper
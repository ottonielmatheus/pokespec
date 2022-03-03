const getHabitatImage = async (habitat) => {
  if (!habitat) {
    habitat = 'unknowed'
  }
  return (await import(`./${habitat}-habitat.jpg`)).default
}

export default getHabitatImage
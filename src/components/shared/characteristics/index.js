const getCharacteristicImage = async (characteristic) => {
  if (!characteristic) {
    return null
  }
  return (await import(`./${characteristic}.png`)).default
}

export default getCharacteristicImage
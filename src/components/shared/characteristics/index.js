const getCharacteristicImage = async (characteristic) => {
  if (!characteristic) {
    return null
  }
  try {
    return (await import(`./${characteristic}.png`)).default
  } catch (err) {
    return null
  }
}

export default getCharacteristicImage
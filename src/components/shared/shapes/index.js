const getShapeImage = async (shape) => {
  if (!shape) {
    return null
  }
  try {
    return (await import(`./${shape}.png`)).default
  } catch (err) {
    return null
  }
}

export default getShapeImage
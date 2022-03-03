const getShapeImage = async (shape) => {
  if (!shape) {
    return null
  }
  return (await import(`./${shape}.png`)).default
}

export default getShapeImage
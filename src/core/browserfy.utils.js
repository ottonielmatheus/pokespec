const setPageTitle = (title) => {
  document.title = title + ' | Pokespec'
}

const setPageDescription = (description) => {
  const metaTag = document.createElement('meta')
  const oldMetaTag = document.querySelector('meta[name="description"]')

  metaTag.name = 'description'
  metaTag.content = description

  if (oldMetaTag) {
    oldMetaTag.remove()
  }

  document.querySelector('head').appendChild(metaTag)
}

export {
  setPageTitle,
  setPageDescription
}
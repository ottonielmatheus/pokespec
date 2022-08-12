const setPageTitle = (title) => {
  document.title = title + ' | Pokespec'
}

const setPageIcon = (icon) => {
  var link = document.querySelector(`link[rel~='icon']`)
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  link.href = icon
}

export {
  setPageTitle,
  setPageIcon
}
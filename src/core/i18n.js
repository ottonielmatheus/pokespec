import _ from 'lodash'
const defaultLanguage = 'en'

export default (data, language) => {
  return _.find(data, data => data.language.name === (language || defaultLanguage))
}
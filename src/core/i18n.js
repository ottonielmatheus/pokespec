import _ from 'lodash'
const language = 'en'

export default (data) => {
  return _.find(data, data => data.language.name === language)
}
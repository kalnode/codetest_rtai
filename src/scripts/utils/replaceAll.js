/**
 * Replace each match found within a string.
 * @param {string} [str='']
 * @param {Object} [replace={}]
 * @returns {string}
 */
const replaceAll = (str = '', replace = {}) => {
  return Object.keys(replace).reduce(
    (updatedStr, find) => updatedStr.replaceAll(new RegExp(find, 'g'), replace[find]),
    str
  )
}

export default replaceAll

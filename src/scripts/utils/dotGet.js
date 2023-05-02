/**
 * Given a target object, retrieve an attribute using dot-notation key.
 * Optionally, provide default value to be used if the attribute is not found.
 * @param {Object} target
 * @param {string|null} [key=null]
 * @param {string|number|Object|null} [defaultValue=null]
 * @returns {string|number|Object|null}
 */
const dotGet = (target, key = null, defaultValue = null) => {
  if (key === null) {
    return target
  }

  return key
    .split('.')
    .reduce(
      (result, segment) => {
        if (result === defaultValue) {
          result = target
        }
        if (!segment) {
          return result
        }
        if (segment in result) {
          return result[segment]
        }
        return defaultValue
      },
      defaultValue
    )
}

export default dotGet

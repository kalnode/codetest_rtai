export default function getPossibleScrollDirections (element, returnType) {
  let directions = null

  if (returnType == 'object') {
    directions = {}
    if (element.scrollLeft > 0) {
      directions.left = true
    }
    if (element.scrollLeft < element.scrollWidth - element.clientWidth - 1) {
      directions.right = true
    }
  } else {
    directions = []
    if (element.scrollLeft > 0) {
      directions.push('scrollableLeft')
    }
    if (element.scrollLeft < element.scrollWidth - element.clientWidth - 1) {
      directions.push('scrollableRight')
    }
    if (directions === []) {
      directions.push('scrollableRight')
    }
  }

  return directions
}

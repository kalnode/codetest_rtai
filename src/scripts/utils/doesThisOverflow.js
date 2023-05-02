export default function doesThisOverflow (element, direction = 'null') {
  // TODO: Right now we just return a blunt true/false, but ideally
  // we return an object with vertical true/false and horizontal true/false
  if ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth)) {
    return true
  }

  return false
}

export default function isTouch () {
  // ATTEMPT TO DETECT TOUCH DEVICE
  // Until such time a single native rule exists for this (See CSS ).
  if (
    'ontouchstart' in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.DocumentTouch && document instanceof DocumentTouch
  ) {
    return true
  }

  return false
}

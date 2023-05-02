/**
 * Scrolls the contents of an element to a certain position (x, y),
 * and tells us when scrolling has finished.
 *
 * @param el the element to scroll
 * @param distance the amount to scroll by
 * @returns {Promise<unknown>} that resolves when it has finished scrolling.
 */

export default function scrollByAmount (el, distance = { x: 0, y: 0 }) {
  // Scrolls the contents of an element to a certain position (x, y),
  // and tells us when scrolling has finished.
  return new Promise((resolve) => {
    let scrollTimeout

    // SCROLL LISTENER
    // --------------------------------
    // Setup a scroll listener on the element and a timeout that keeps resetting itself while scrolling is occuring.
    el.addEventListener('scroll', function Handler (e) {
      if (typeof e === 'undefined') {
        return
      }

      // We keep resetting scrollTimeout as long we're scrolling; it never gets to finish so long as scrolling is happening.
      clearTimeout(scrollTimeout)

      // scrollTimeout will only get to finish once we've stopped scrolling (because we're no longer continually resetting it).
      // Finally we return resolve(), and that tells us scrolling has finished.
      scrollTimeout = setTimeout(() => {
        el.removeEventListener('scroll', Handler)
        return resolve()
      }, 100)
    })

    // ACTUAL SCROLL EVENT
    // --------------------------------
    // Scrolls a relative amount.
    // Parameter behavior:'smooth' gives us a default smoothing effect (instead of a jump cut).

    el.scrollBy({ left: distance.x, top: distance.y, behavior: 'smooth' })

    // For custom speed/duration:
    // We'd have to use a 3rd-party library. The classic one is jQuery. There are pluses and minuses in doing this.
  })
}

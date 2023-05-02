export default function isMobile () {
  // Experimental: matchMedia() doesn't have 100% adoption
  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
  if (isMobile) {
    return true
  }
  return false
}

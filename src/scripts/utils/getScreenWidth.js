export default function getScreenWidth () {
  return Math.min(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
}

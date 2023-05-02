export default function waitFor (conditionFunction, time = 400) {
  // One-liner that waits for condition to pass
  // This loops and checks for condition every X seconds
  // When satisfied, it exits loop and processing continues
  // Example: utils.waitFor(_ => this.myFlag === true).then( () => {  //DO STUFF } )

  const poll = resolve => {
    if (conditionFunction()) resolve()
    else setTimeout(_ => poll(resolve), time)
  }

  return new Promise(poll)
}

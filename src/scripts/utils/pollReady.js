/**
 * Perform some action when some ready condition is met.
 * @param {Function} predicate - Function that returns true when ready.
 * @param {number} delay - Time in milliseconds between readiness checks.
 * @param {number} attempts - Iterations for poll attempts.
 * @param {string} error - Message to display if readiness not achieved after exhausting attempts.
 * @returns {Promise<void>}
 */
const pollReady = (predicate, { delay = 200, attempts = 10, error = 'Poll timed out' } = {}) =>
  new Promise(
    (resolve, reject) => {
      const runPoll = () => {
        if (predicate()) {
          return resolve()
        }
        return --attempts > 0
          ? setTimeout(runPoll, delay)
          : reject(error)
      }
      runPoll()
    }
  )

export default pollReady

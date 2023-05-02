import pollReady from './pollReady.js'

beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('pollReady', () => {
    const predicate = trueAfter => {
        let limit = trueAfter
        return () => --limit < 0
    }
    test('returns immediately when predicate is true', () => {
        expect.assertions(1)
        pollReady(predicate(0))
        expect(setTimeout).toHaveBeenCalledTimes(0)
    })

    test('returns after one attempt when successful', () => {
        expect.assertions(2)
        pollReady(predicate(1))
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200)
    })

    test('can use specified delay', () => {
        expect.assertions(2)
        pollReady(predicate(1), { delay: 50 })
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50)
    })

    test('can use specified attempts and error', () => {
        expect.assertions(1)
        const errorMessage = 'exhausted all attempts'
        expect(pollReady(predicate(1), { attempts: 0, error: errorMessage}))
            .rejects.toBe(errorMessage)
    })
})

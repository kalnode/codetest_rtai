import replaceAll from './replaceAll.js'

describe('replaceAll', () => {
    const testStr = 'key1, key2, key3'

    test('will return unchanged string if no matches', () => {
        expect.assertions(1)
        expect(replaceAll(testStr, { key4: 'hello' })).toBe(testStr)
    })

    test('will replace a single match when found', () => {
        expect.assertions(1)
        expect(replaceAll(testStr, { key3: 'hello' })).toBe('key1, key2, hello')
    })

    test('will replace any matches when found', () => {
        expect.assertions(1)
        expect(replaceAll(testStr, { key: 'hello' })).toBe('hello1, hello2, hello3')
    })

    test('will use regex to replace found matches', () => {
        expect.assertions(1)
        expect(replaceAll(testStr, { 'key\\d,': 'hello' })).toBe('hello hello key3')
    })

    test('will take multiple replacements for found matches', () => {
        expect.assertions(1)
        expect(replaceAll(testStr, { key1: 'hello', key2: 'good day', key3: 'bye' })).toBe('hello, good day, bye')
    })

    test('will use the order of replacements, my overwrite previous ones', () => {
        expect.assertions(1)
        expect(replaceAll(testStr, { key1: 'hello', key2: 'good day', day: 'bye' })).toBe('hello, good bye, key3')
    })
})

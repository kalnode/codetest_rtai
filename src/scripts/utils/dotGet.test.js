import dotGet from './dotGet.js'

describe('dotGet', () => {
    const testObj = {
        one: 'first',
        two: 'second',
        nestedOne: {
            nestOne: 'nestFirst',
            nestedTwo: {
                nestTwo: 'nestSecond'
            }
        },
        nestedArray: [
            'arrayFirst',
            'arraySecond',
            {
                arrayNested: 'nestedInArray'
            }
        ]
    }

    test('will return original object when no key is provided', () => {
        expect.assertions(1)
        expect(dotGet(testObj)).toBe(testObj)
    })

    test('will return original object when key is empty', () => {
        expect.assertions(2)
        expect(dotGet(testObj, '')).toBe(testObj)
        expect(dotGet(testObj, 'one.')).toBe(testObj.one)
    })

    test('will return default value provided if no match found', () => {
        const fakeOne = 'fakeOne'
        const fakeTwo = 123
        expect.assertions(3)
        expect(dotGet(testObj, 'fake')).toBeNull()
        expect(dotGet(testObj, 'bad', fakeOne)).toBe(fakeOne)
        expect(dotGet(testObj, 'wrong', fakeTwo)).toBe(fakeTwo)
    })

    test('will get a property from the first level', () => {
        expect.assertions(4)
        expect(dotGet(testObj, 'one')).toBe(testObj.one)
        expect(dotGet(testObj, 'two')).toBe(testObj.two)
        expect(dotGet(testObj, 'nestedOne')).toBe(testObj.nestedOne)
        expect(dotGet(testObj, 'nestedArray')).toBe(testObj.nestedArray)
    })

    test('will get a property from the second level', () => {
        expect.assertions(5)
        expect(dotGet(testObj, 'nestedOne.nestOne')).toBe(testObj.nestedOne.nestOne)
        expect(dotGet(testObj, 'nestedOne.nestedTwo')).toBe(testObj.nestedOne.nestedTwo)
        expect(dotGet(testObj, 'nestedArray.0')).toBe(testObj.nestedArray[0])
        expect(dotGet(testObj, 'nestedArray.1')).toBe(testObj.nestedArray[1])
        expect(dotGet(testObj, 'nestedArray.2')).toBe(testObj.nestedArray[2])
    })

    test('will get a property from the third level', () => {
        expect.assertions(2)
        expect(dotGet(testObj, 'nestedOne.nestedTwo.nestTwo')).toBe(testObj.nestedOne.nestedTwo.nestTwo)
        expect(dotGet(testObj, 'nestedArray.2.arrayNested')).toBe(testObj.nestedArray[2].arrayNested)
    })
})

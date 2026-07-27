import genDiff from '../src/index.js'

test('function accepts 2 arguments', () => {
    expect(genDiff('1', '2')).toBe('12')
})
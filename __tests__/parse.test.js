import parse from '../src/parse.js'

const expected = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false
}

test('file parses absolute path', () => {
    expect(parse('/home/scared_slipper/project/__fixtures__/file1.json')).toEqual(expected)
})

test('file parses relative path', () => {
    expect(parse('__fixtures__/file1.json')).toEqual(expected)
})

test('file parses yaml', () => {
    expect(parse('__fixtures__/file1.yml')).toEqual(expected)
})

test('file parses json', () => {
    expect(parse('__fixtures__/file1.json')).toEqual(expected)
})

test('file not found', () => {
    expect(() => parse('__fixtures__/file6.json')).toThrow()
})

test('unsupported file format', () => {
    expect(() => parse('__fixtures__/file1.txt')).toThrow()
})
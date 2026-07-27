import parse from '../src/parse.js'

const expected = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false
}

test('item parses absolute path', () => {
    expect(parse('/home/scared_slipper/project/__fixtures__/file1.json')).toBe(expected)
})

test('item parses relative path', () => {
    expect(parse('../__fixtures__/file1.json')).toBe(expected)
})

test('item parses yaml', () => {
    expect(parse('../__fixtures__/file1.yml')).toBe(expected)
})

test('item parses json', () => {
    expect(parse('../__fixtures__/file1.json')).toBe(expected)
})
import genDiff from '../src/index.js'

test('positive, no format (stylish format)', () => {
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expected)
})

test('positive, plain format', () => {
    const expected = `
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`
    expect(genDiff('/home/scared_slipper/project/__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toBe(expected)
})
/*
test('positive, json format', () => {
const expected = `
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yml', 'json')).toBe(expected)
})
*/
test('file does not exist', () => {
    expect(() => genDiff('./__fixtures__/file1.json', 'abc')).toThrow()
})

test('unsupported file format', () => {
    expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.txt')).toThrow()
})

test('unsupported output format', () => {
    const expected = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.txt', 'txt')).toBe(expected)
})
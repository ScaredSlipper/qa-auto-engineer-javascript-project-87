import genDiff from '../src/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getPath = (file) => path.join(__dirname, '..', '__fixtures__', file)

const json1 = getPath('file1.json')
const json2 = getPath('file2.json')
const yaml = getPath('file1.yaml')
const yml1 = getPath('file1.yml')
const yml2 = getPath('file2.yml')

test('positive, no format (stylish format)', () => {
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
    expect(genDiff(json1, json2)).toBe(expected)
    expect(genDiff(yml1, yml2)).toBe(expected)
    expect(genDiff(yaml, json2)).toBe(expected)
    expect(genDiff(yml1, json2)).toBe(expected)
})

test('positive, plain format', () => {
    const expected = `
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`
    expect(genDiff(json1, '__fixtures__/file2.json', 'plain')).toBe(expected)
})

test('positive, json format', () => {
    const expected = `[{"key":"follow","file1Value":false},{"key":"host","file1Value":"hexlet.io","file2Value":"hexlet.io"},{"key":"proxy","file1Value":"123.234.53.22"},{"key":"timeout","file1Value":50,"file2Value":20},{"key":"verbose","file2Value":true}]`
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.yml', 'json')).toBe(expected)
})

test('file does not exist', () => {
    expect(() => genDiff('./__fixtures__/file1.json', 'abc')).toThrow()
})

test('unsupported file format', () => {
    expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.txt')).toThrow()
})

test('unsupported output format', () => {
    expect(genDiff(json1, '__fixtures__/file2.json', 'txt')).toBe('unsupported output format')
})

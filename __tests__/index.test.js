import genDiff from '../src/gendiff.js'
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
const txt = getPath('file1.txt')

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

test('positive, plain format, relative path', () => {
    const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`

    expect(genDiff(json1, '__fixtures__/file2.json', 'plain')).toBe(expected)
})

test('positive, json format', () => {
    const expected = {
        follow: 'deleted',
        host: 'unchanged',
        proxy: 'deleted',
        timeout: 'changed',
        verbose: 'added',
    }

    expect(genDiff(json1, yml2, 'json')).toEqual(expected)
})

test('file does not exist', () => {
    expect(genDiff(json1, 'abc')).toBe('file not found or unable to read file')
})

test('unsupported file format', () => {
    expect(genDiff(json1, txt)).toBe('unsupported file format')
})

test('unsupported output format', () => {
    expect(genDiff(json1, json2, 'txt')).toBe('unsupported output format')
})

import parse from '../src/parse.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getPath = (file) => path.join(__dirname, '..', '__fixtures__', file)

const json = getPath('file1.json')
const yml = getPath('file1.yml')
const yaml = getPath('file1.yaml')

const expected = {
  host: "hexlet.io",
  timeout: 50,
  proxy: "123.234.53.22",
  follow: false
}

test('file parses absolute path, json', () => {
    expect(parse(json)).toEqual(expected)
})

test('file parses relative path', () => {
    expect(parse('./__fixtures__/file1.json')).toEqual(expected)
})

test('file parses yml', () => {
    expect(parse(yml)).toEqual(expected)
})

test('file parses yaml', () => {
    expect(parse(yaml)).toEqual(expected)
})

test('file not found', () => {
    expect(() => parse(getPath('file6.json'))).toThrow(Error('file not found or unable to read file'))
})

test('unsupported file format', () => {
    expect(() => parse(getPath('file1.txt'))).toThrow(Error('unsupported file format'))
})
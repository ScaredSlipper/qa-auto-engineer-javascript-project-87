import genDiff from '../src/gendiff.js'
import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { jest } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getPath = file => path.join(__dirname, '..', '__fixtures__', file)
const read = file => fs.readFileSync(getPath(file), 'utf-8')

const json1 = getPath('file1.json')
const json2 = getPath('file2.json')
const yaml = getPath('file1.yaml')
const yml1 = getPath('file1.yml')
const yml2 = getPath('file2.yml')
const txt = getPath('file1.txt')
const valS = getPath('value_string.json')
const valN = getPath('value_num.json')
const deepEqual = getPath('deep_equal.json')
const deepUnequal = getPath('deep_unequal.json')

const expectedStylish = read('stylish.expected')
const expectedPlain = read('plain.expected')
const expectedJson = read('json.expected')
const expectedChange = read('value_change.expected')
const expectedDeep = read('deep_equal.expected')
const expectedDeepPlain = read('deep_equal_plain.expected')

test('positive, no format (stylish format)', () => {
  const expected = expectedStylish

  expect(genDiff(json1, json2)).toBe(expected)
  expect(genDiff(yml1, yml2)).toBe(expected)
  expect(genDiff(yaml, json2)).toBe(expected)
  expect(genDiff(yml1, json2)).toBe(expected)
})

test('positive, plain format', () => {
  const expected = expectedPlain

  expect(genDiff(json1, json2, 'plain')).toBe(expected)
})

test('positive, json format', () => {
  const expected = expectedJson

  expect(genDiff(json1, yml2, 'json')).toEqual(expected)
})

test('file does not exist', () => {
  expect(() => genDiff(json1, 'abc')).toThrow('file not found or unable to read file')
})

test('unsupported file format', () => {
  expect(() => genDiff(json1, txt)).toThrow('unsupported file format')
})

test('unsupported output format', () => {
  expect(() => genDiff(json1, json2, 'txt')).toThrow('unsupported output format')
})

test('data type change is visible', () => {
  const expected = expectedChange
  expect(genDiff(valS, valN, 'plain')).toEqual(expected)
})

test('relative path transforms to absolute', () => {
  const spy = jest.spyOn(fs, 'readFileSync')
  const mockCwd = path.join(__dirname, '..')
  const relativePath = './__fixtures__/file1.json'
  const expectedPath = path.resolve(mockCwd, relativePath)

  genDiff(relativePath, json2)

  expect(spy).toHaveBeenCalledWith(expectedPath, 'utf-8')
})

test('deep equality', () => {
  expect(genDiff(deepEqual, deepUnequal)).toEqual(expectedDeep)
  expect(genDiff(deepEqual, deepUnequal, 'plain')).toEqual(expectedDeepPlain)
})

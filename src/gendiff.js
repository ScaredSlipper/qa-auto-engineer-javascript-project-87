import _ from 'lodash'
import fs from 'node:fs'
import { extname } from 'node:path'
import parsers from './parsers.js'
import formatters from './formatters/index.js'

const getDiff = (file1, file2) => {
  const file1Keys = Object.keys(file1)
  const file2Keys = Object.keys(file2)
  const diff = _.union(file1Keys, file2Keys)
    .sort()
    .reduce((acc, key) => {
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        if (file1[key] === file2[key]) {
          acc.push({ key: key, type: 'unchanged', value: file1[key] })
          return acc
        }
        acc.push({ key: key, type: 'changed', file1Value: file1[key], file2Value: file2[key] })
        return acc
      }
      if (Object.hasOwn(file1, key)) {
        acc.push({ key: key, type: 'deleted', value: file1[key] })
        return acc
      }
      if (Object.hasOwn(file2, key)) {
        acc.push({ key: key, type: 'added', value: file2[key] })
        return acc
      }
    }, [])
  return diff
}

const readFile = filePath => fs.readFileSync(filePath, 'utf-8')

const getExt = filePath => extname(filePath).toLowerCase()

const read = (filePath) => {
  try {
    const text = readFile(filePath)
    const ext = getExt(filePath)
    if (Object.hasOwn(parsers, ext)) {
      const file = parsers[ext](text)
      return file
    }
  }
  catch {
    throw new Error('file not found or unable to read file')
  }
  throw new Error('unsupported file format')
}

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = read(filePath1)
  const file2 = read(filePath2)

  const diff = getDiff(file1, file2)

  if (Object.hasOwn(formatters, format)) {
    const result = diff.reduce((acc, difference) => {
      acc.push(formatters[format][difference.type](difference))
      return acc
    }, [])
    return formatters[format].format(result)
  }
  else {
    throw new Error ('unsupported output format')
  }
}

export default genDiff

import getDiff from './index.js'
import fs from 'node:fs'
import { extname } from 'node:path'
import parsers from './parsers.js'
import formatters from './formatters/index.js'

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

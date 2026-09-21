import _ from 'lodash'
import parse from './parsers.js'
import Output from './formatters/index.js'

const getDiff = (file1, file2) => {
  const file1Keys = Object.keys(file1)
  const file2Keys = Object.keys(file2)
  const diff = _.union(file1Keys, file2Keys)
    .sort()
    .reduce((acc, key) => {
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        acc.push({ key: key, file1Value: file1[key], file2Value: file2[key] })
        return acc
      }
      if (Object.hasOwn(file1, key)) {
        acc.push({ key: key, file1Value: file1[key] })
        return acc
      }
      if (Object.hasOwn(file2, key)) {
        acc.push({ key: key, file2Value: file2[key] })
        return acc
      }
    }, [])
  return diff
}

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = parse(filePath1)
  const file2 = parse(filePath2)

  const diff = getDiff(file1, file2)

  const output = new Output(diff)

  try {
    return output[format]()
  }

  catch {
    throw new Error ('unsupported output format')
  }
}

export default genDiff

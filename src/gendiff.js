import parse from './parsers.js'
import Output from './formatters/index.js'

const getDiff = (file1, file2) => {
  const file1Keys = Object.keys(file1)
  const file2Keys = Object.keys(file2)
  const diff = file1Keys
    .filter(key1 => !file2Keys.some(key2 => key1 === key2))
    .concat(file2Keys)
    .sort((a,b) => a.localeCompare(b))
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
  try {
    const file1 = parse(filePath1)
    const file2 = parse(filePath2)

    const diff = getDiff(file1, file2)
  
    const output = new Output(diff)

    try {
      return output[format]()
    }

    catch {
      return 'unsupported output format'
    }
  }
  
  catch(error) {
    return error.message
  }
}

export default genDiff
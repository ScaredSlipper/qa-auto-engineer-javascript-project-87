import parse from './parse.js'

const genDiff = (filePath1, filePath2, format = '') => {
  const file1 = parse(filePath1)
  const file2 = parse(filePath2)

  const file1Keys = Object.keys(file1)
  const file2Keys = Object.keys(file2)
  const diff = file1Keys
    .filter(key1 => !file2Keys.find(key2 => key1 === key2))
    .concat(file2Keys)
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
  
  const result = diff.reduce((acc, difference) => {
    if (Object.hasOwn(difference, 'file1Value') && Object.hasOwn(difference, 'file2Value')) {
      if (difference.file1Value === difference.file2Value) {
        acc.push(`    ${difference.key}: ${difference.file1Value}`)
        return acc
      }
      acc.push(`  - ${difference.key}: ${difference.file1Value}`)
      acc.push(`  + ${difference.key}: ${difference.file2Value}`)
      return acc
    }
    if (Object.hasOwn(difference, 'file1Value')) {
      acc.push(`  - ${difference.key}: ${difference.file1Value}`)
      return acc
    }
    if (Object.hasOwn(difference, 'file2Value')) {
      acc.push(`  + ${difference.key}: ${difference.file2Value}`)
      return acc
    }
  }, [])
  .join('\n')
console.log(`{\n${result}\n}`)
  return `{\n${result}\n}`
}

export default genDiff
import _ from 'lodash'

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

export default getDiff

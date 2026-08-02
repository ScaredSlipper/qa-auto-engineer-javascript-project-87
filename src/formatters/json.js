function json(diff) {
  const result = diff.reduce((acc, difference) => {
    if (Object.hasOwn(difference, 'file1Value') && Object.hasOwn(difference, 'file2Value')) {
      if (difference.file1Value === difference.file2Value) {
        acc[difference.key] = 'unchanged'
        return acc
      }
      acc[difference.key] = `changed`
      return acc
    }
    if (Object.hasOwn(difference, 'file1Value')) {
      acc[difference.key] = `deleted`
      return acc
    }
    if (Object.hasOwn(difference, 'file2Value')) {
      acc[difference.key] = `added`
      return acc
    }
  }, {})
  return JSON.stringify(result, null, 2)
}

export default json
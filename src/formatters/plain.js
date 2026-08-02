function plain(diff) {
  const result = diff.reduce((acc, difference) => {
    if (Object.hasOwn(difference, 'file1Value') && Object.hasOwn(difference, 'file2Value')) {
      if (difference.file1Value === difference.file2Value) {
        return acc
      }
      acc.push(`Property '${difference.key}' was updated. From ${difference.file1Value} to ${difference.file2Value}`)
      return acc
    }
    if (Object.hasOwn(difference, 'file1Value')) {
      acc.push(`Property '${difference.key}' was removed`)
      return acc
    }
    if (Object.hasOwn(difference, 'file2Value')) {
      acc.push(`Property '${difference.key}' was added with value: ${difference.file2Value}`)
      return acc
    }
  }, [])
  .join('\n')
  return `${result}`
}

export default plain
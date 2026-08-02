function stylish(diff) {
    const result = diff.reduce((acc, difference) => {
    if (Object.hasOwn(difference, 'file1Value') && Object.hasOwn(difference, 'file2Value')) {
      if (difference.file1Value === difference.file2Value) {
        acc.push(`  ${difference.key}: ${difference.file1Value}`)
        return acc
      }
      acc.push(`- ${difference.key}: ${difference.file1Value}`, `  + ${difference.key}: ${difference.file2Value}`)
      return acc
    }
    if (Object.hasOwn(difference, 'file1Value')) {
      acc.push(`- ${difference.key}: ${difference.file1Value}`)
      return acc
    }
    if (Object.hasOwn(difference, 'file2Value')) {
      acc.push(`+ ${difference.key}: ${difference.file2Value}`)
      return acc
    }
  }, [])
  .join('\n')
  return `{\n${result}\n}`
}

export default stylish
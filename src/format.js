function stylish(diff) {
    const result = diff.reduce((acc, difference) => {
    if (Object.hasOwn(difference, 'file1Value') && Object.hasOwn(difference, 'file2Value')) {
      if (difference.file1Value === difference.file2Value) {
        acc.push(`    ${difference.key}: ${difference.file1Value}`)
        return acc
      }
      acc.push(`  - ${difference.key}: ${difference.file1Value}`, `  + ${difference.key}: ${difference.file2Value}`)
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
  return `\n{\n${result}\n}\n`
}

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
  return `\n${result}\n`
}

function json(diff) {
  const result = JSON.stringify(diff)
  return `\n${result}\n`
}

class Output {
  constructor(diff) {
    this.diff = diff
  }

  stylish() {
    return stylish(this.diff)
  }

  plain() {
    return plain(this.diff)
  }

   json() {
    return json(this.diff)
  }
}

export default Output
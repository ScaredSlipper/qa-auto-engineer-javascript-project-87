const insert = (value) => {
  if (typeof value === 'string') {
    return `${value}`
  }
  if (typeof value === 'number') {
    return `${value}`
  }
  if (typeof value === 'boolean') {
    return `${value}`
  }
  if (value === null) {
    return value
  }
  if (typeof value === 'object' && Array.isArray(value) === false) {
    const json = JSON.stringify(value, null, 6)
    const rows = json.split('\n')
    rows[3] = '    }'
    const string = rows.join('\n')
    return string
  }
  const result = value.reduce((acc, arr) => {
    acc += arr + ', '
    return acc
  }, '')
  return `[${result.slice(0, result.length - 2)}]`
}

const stylish = {
  unchanged: (diff) => {
    return `    ${diff.key}: ${insert(diff.value)}`
  },
  changed: (diff) => {
    return `  - ${diff.key}: ${insert(diff.file1Value)}\n  + ${diff.key}: ${insert(diff.file2Value)}`
  },
  deleted: (diff) => {
    return `  - ${diff.key}: ${insert(diff.value)}`
  },
  added: (diff) => {
    return `  + ${diff.key}: ${insert(diff.value)}`
  },
  format: (diff) => {
    const result = diff.join('\n')
    return `{\n${result}\n}`
  },
}

export default stylish

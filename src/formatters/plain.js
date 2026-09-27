const insert = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
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
    const json = JSON.stringify(value, null, 1)
    const rows = json.split('\n')
    rows[0] = '{'
    rows[3] = '}'
    const string = rows.join('\n')
    return string
  }
  const result = value.reduce((acc, arr) => {
    acc += arr + ', '
    return acc
  }, '')
  return `[${result.slice(0, result.length - 2)}]`
}

const plain = {
  unchanged: () => {
    return undefined
  },
  changed: (diff) => {
    return `Property '${diff.key}' was updated. From ${insert(diff.file1Value)} to ${insert(diff.file2Value)}`
  },
  deleted: (diff) => {
    return `Property '${diff.key}' was removed`
  },
  added: (diff) => {
    return `Property '${diff.key}' was added with value: ${insert(diff.value)}`
  },
  format: (diff) => {
    const result = diff.filter(text => text !== undefined).join('\n')
    return `${result}`
  },
}

export default plain

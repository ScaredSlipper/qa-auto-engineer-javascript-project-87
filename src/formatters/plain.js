const insert = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return value
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

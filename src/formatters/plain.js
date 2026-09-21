const plain = {
  unchanged: () => {
    return undefined
  },
  changed: (diff) => {
    return `Property '${diff.key}' was updated. From ${diff.file1Value} to ${diff.file2Value}`
  },
  deleted: (diff) => {
    return `Property '${diff.key}' was removed`
  },
  added: (diff) => {
    return `Property '${diff.key}' was added with value: ${diff.value}`
  },
  format: (diff) => {
    const result = diff.filter(text => text !== undefined).join('\n')
    return `${result}`
  },
}

export default plain

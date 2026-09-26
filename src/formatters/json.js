const json = {
  unchanged: (diff) => {
    const result = {}
    result[diff.key] = { value: diff.value, status: diff.type }
    return result
  },
  changed: (diff) => {
    const result = {}
    result[diff.key] = { 'old value': diff.file1Value, 'status': diff.type , 'new value': diff.file2Value}
    return result
  },
  deleted: (diff) => {
    const result = {}
    result[diff.key] = { value: diff.value, status: diff.type }
    return result
  },
  added: (diff) => {
    const result = {}
    result[diff.key] = { value: diff.value, status: diff.type }
    return result
  },
  format: (diff) => {
    const json = diff.reduce((acc, difference) => {
      const [[key, value]] = Object.entries(difference)
      acc[key] = value
      return acc
    }, {})
    const result = JSON.stringify(json, null, 2)
    return result
  },
}

export default json

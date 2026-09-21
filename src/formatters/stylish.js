const stylish = {
  unchanged: (diff) => {
    return `    ${diff.key}: ${diff.value}`
  },
  changed: (diff) => {
    return `  - ${diff.key}: ${diff.file1Value}\n  + ${diff.key}: ${diff.file2Value}`
  },
  deleted: (diff) => {
    return `  - ${diff.key}: ${diff.value}`
  },
  added: (diff) => {
    return `  + ${diff.key}: ${diff.value}`
  },
  format: (diff) => {
    const result = diff.join('\n')
    return `{\n${result}\n}`
  },
}

export default stylish

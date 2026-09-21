const json = {
  unchanged: (diff) => {
    return `  "${diff.key}": "unchanged",`
  },
  changed: (diff) => {
    return `  "${diff.key}": "changed",`
  },
  deleted: (diff) => {
    return `  "${diff.key}": "deleted",`
  },
  added: (diff) => {
    return `  "${diff.key}": "added",`
  },
  format: (diff) => {
    const text = diff.join('\n')
    const result = text.slice(0, text.length - 1)
    return `{\n${result}\n}`
  },
}

export default json

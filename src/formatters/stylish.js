import chalk from 'chalk'

const insert = (value) => {
  if (typeof value === 'string') {
    return `${chalk.blueBright(value)}`
  }
  if (typeof value === 'number') {
    return `${chalk.cyanBright(value)}`
  }
  if (typeof value === 'boolean') {
    return `${chalk.rgb(255, 255, 0)(value)}`
  }
  if (value === null) {
    return `${chalk.rgb(255, 255, 0)(value)}`
  }
  if (typeof value === 'object' && Array.isArray(value) === false) {
    const json = JSON.stringify(value, null, 6)
    const rows = json.split('\n')
    rows[3] = '    }'
    const string = rows.join('\n')
    return `${chalk.rgb(255, 165, 0)(string)}`
  }
  const result = value.reduce((acc, arr) => {
    acc += arr + ', '
    return acc
  }, '')
  return `${chalk.rgb(255, 100, 0)(`[${result.slice(0, result.length - 2)}]`)}`
}

const stylish = {
  unchanged: (diff) => {
    return `    ${diff.key}: ${insert(diff.value)}`
  },
  changed: (diff) => {
    return `  ${chalk.red('-')} ${diff.key}: ${insert(diff.file1Value)}\n  ${chalk.greenBright('+')} ${diff.key}: ${insert(diff.file2Value)}`
  },
  deleted: (diff) => {
    return `  ${chalk.red('-')} ${diff.key}: ${insert(diff.value)}`
  },
  added: (diff) => {
    return `  ${chalk.greenBright('+')} ${diff.key}: ${insert(diff.value)}`
  },
  format: (diff) => {
    const result = diff.join('\n')
    return `{\n${result}\n}`
  },
}

export default stylish

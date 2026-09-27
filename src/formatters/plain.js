import chalk from 'chalk'

const insert = (value) => {
  if (typeof value === 'string') {
    return `'${chalk.blueBright(value)}'`
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
    const json = JSON.stringify(value, null, 1)
    const rows = json.split('\n')
    rows[0] = '{'
    rows[3] = '}'
    const string = rows.join('\n')
    return `${chalk.rgb(255, 165, 0)(string)}`
  }
  const result = value.reduce((acc, arr) => {
    acc += arr + ', '
    return acc
  }, '')
  return `${chalk.rgb(255, 100, 0)(`[${result.slice(0, result.length - 2)}]`)}`
}

const plain = {
  unchanged: () => {
    return undefined
  },
  changed: (diff) => {
    return `Property '${(diff.key)}' was updated. ${chalk.red('From')} ${insert(diff.file1Value)} ${chalk.greenBright('to')} ${insert(diff.file2Value)}`
  },
  deleted: (diff) => {
    return `Property '${(diff.key)}' was ${chalk.red('removed')}`
  },
  added: (diff) => {
    return `Property '${(diff.key)}' was ${chalk.greenBright('added')} with value: ${insert(diff.value)}`
  },
  format: (diff) => {
    const result = diff.filter(text => text !== undefined).join('\n')
    return `${result}`
  },
}

export default plain

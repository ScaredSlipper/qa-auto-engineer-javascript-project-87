#!/usr/bin/env node

import { program } from 'commander'

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(genDiff)

program.parse()

const genDiff = (file1, file2) => {
    return null
}

export default genDiff
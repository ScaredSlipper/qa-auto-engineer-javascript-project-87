#!/usr/bin/env node

import genDiff from '../src/index.js'
import { program } from 'commander'

program
  .version('0.2.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const format = Object.hasOwn(options, 'format') ? options.format :'stylish'
    const diff = genDiff(filepath1, filepath2, format)
    console.log(diff)
  })

program.parse()